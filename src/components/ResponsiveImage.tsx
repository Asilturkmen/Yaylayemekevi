/**
 * scripts/optimize-images.mjs tarafından üretilen duyarlı türevleri
 * <picture> içinde AVIF -> WebP sırasıyla sunar.
 *
 * Türevler import.meta.glob ile otomatik keşfedilir; yeni bir fotoğraf
 * eklemek için src/assets/ içine koyup `npm run images` çalıştırmak yeterli.
 */
import placeholders from '../assets/optimized/placeholders.json';

type Derivative = { width: number; url: string };

const collect = (modules: Record<string, unknown>) => {
  const bySlug = new Map<string, Derivative[]>();
  for (const [path, url] of Object.entries(modules)) {
    const match = /\/([^/]+)-(\d+)\.[a-z]+$/.exec(path);
    if (!match) continue;
    const [, slug, width] = match;
    const list = bySlug.get(slug) ?? [];
    list.push({ width: Number(width), url: url as string });
    bySlug.set(slug, list);
  }
  for (const list of bySlug.values()) list.sort((a, b) => a.width - b.width);
  return bySlug;
};

const AVIF = collect(
  import.meta.glob('../assets/optimized/*.avif', {
    eager: true,
    query: '?url',
    import: 'default',
  })
);

const WEBP = collect(
  import.meta.glob('../assets/optimized/*.webp', {
    eager: true,
    query: '?url',
    import: 'default',
  })
);

const toSrcSet = (list: Derivative[] | undefined) =>
  list?.map(({ url, width }) => `${url} ${width}w`).join(', ');

export type ImageName = keyof typeof placeholders;

type Props = {
  /** src/assets içindeki dosya adının sadeleştirilmiş hali, ör. "slide3". */
  name: ImageName;
  alt: string;
  /** Tarayıcının doğru türevi seçmesi için CSS boyut ipucu. */
  sizes: string;
  className?: string;
  /** Ekranın üst kısmındaki görseller için: erken indirilir, lazy uygulanmaz. */
  priority?: boolean;
};

const ResponsiveImage = ({ name, alt, sizes, className, priority = false }: Props) => {
  const webp = WEBP.get(name);
  const meta = placeholders[name];
  const fallback = webp?.[webp.length - 1];

  if (!fallback) {
    // Türevler üretilmemiş (npm run images çalıştırılmamış) — sessizce boş dön.
    return null;
  }

  return (
    // display:contents sayesinde <picture> yerlesimi etkilemez, img dogrudan
    // ebeveynin cocugu gibi davranir.
    <picture className="contents">
      <source type="image/avif" srcSet={toSrcSet(AVIF.get(name))} sizes={sizes} />
      <source type="image/webp" srcSet={toSrcSet(webp)} sizes={sizes} />
      <img
        src={fallback.url}
        alt={alt}
        width={meta.width}
        height={meta.height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        // Türev inene kadar bulanık önizleme göster; yüklenince görselin kendisi üzerini kapatır.
        style={{
          backgroundImage: `url("${meta.lqip}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </picture>
  );
};

export default ResponsiveImage;
