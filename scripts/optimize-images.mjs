/**
 * Kaynak fotoğrafları (src/assets/*.jpg|jpeg) duyarlı boyutlarda
 * AVIF + WebP olarak src/assets/optimized/ içine üretir.
 *
 * Kullanım: npm run images
 * Çıktı dosyaları ResponsiveImage bileşeni tarafından
 * import.meta.glob ile otomatik keşfedilir.
 */
import { readdir, mkdir, writeFile, rm, stat } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const SRC = 'src/assets';
const OUT = 'src/assets/optimized';

/** Üretilecek genişlikler. withoutEnlargement sayesinde kaynaktan büyük olanlar atlanır. */
const WIDTHS = [384, 640, 960, 1280, 1920];
/** Galeri küçük resimleri için ek boyut (96px kutu, 2x ekran). */
const THUMB_WIDTH = 192;
/** Sosyal medya onizlemesinde kullanilacak kaynak fotograf. */
const OG_SOURCE = 'herosection.jpg';

const FORMATS = [
  { ext: 'avif', options: { quality: 50, effort: 6 } },
  { ext: 'webp', options: { quality: 72, effort: 6, smartSubsample: true } },
];


/** Türkçe karakterleri ve boşlukları dosya adından temizler. */
const slugify = (name) =>
  name
    .toLowerCase()
    .replaceAll('ı', 'i').replaceAll('ğ', 'g').replaceAll('ü', 'u')
    .replaceAll('ş', 's').replaceAll('ö', 'o').replaceAll('ç', 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const kb = (bytes) => Math.round(bytes / 1024);

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const files = (await readdir(SRC))
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort();

  const placeholders = {};
  let sourceBytes = 0;
  let outputBytes = 0;
  /** Gerçekçi bir masaüstü yüklemesi: her görselin 1280px WebP sürümü. */
  let typicalBytes = 0;

  for (const file of files) {
    const input = join(SRC, file);
    const slug = slugify(basename(file, extname(file)));
    const image = sharp(input, { failOn: 'error' }).rotate(); // EXIF yönünü uygula
    const { width: srcWidth, height: srcHeight } = await image.metadata();
    const { size } = await stat(input);
    sourceBytes += size;

    const widths = [...new Set([THUMB_WIDTH, ...WIDTHS])]
      .filter((w) => w <= srcWidth)
      .sort((a, b) => a - b);
    // Kaynak en geniş hedeften küçükse en azından kendi boyutunda bir çıktı üret.
    if (widths.length === 0) widths.push(srcWidth);

    for (const width of widths) {
      for (const { ext, options } of FORMATS) {
        const out = join(OUT, `${slug}-${width}.${ext}`);
        const { size: outSize } = await image
          .clone()
          .resize({ width, withoutEnlargement: true })
          .toFormat(ext, options)
          .toFile(out);
        outputBytes += outSize;
        if (ext === 'webp' && width === Math.max(...widths.filter((w) => w <= 1280))) {
          typicalBytes += outSize;
        }
      }
    }

    // Yükleme sırasında gösterilecek 24px bulanık önizleme (inline base64).
    const lqip = await image
      .clone()
      .resize({ width: 24 })
      .webp({ quality: 40 })
      .toBuffer();
    placeholders[slug] = {
      lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
      width: srcWidth,
      height: srcHeight,
      aspectRatio: +(srcWidth / srcHeight).toFixed(4),
    };

    console.log(
      `  ${file} (${kb(size)} KB, ${srcWidth}x${srcHeight}) -> ${slug}-{${widths.join(',')}}.{avif,webp}`
    );
  }

  // Sosyal medya onizleme gorseli (WhatsApp/Facebook/X link paylasimlari icin).
  // Sabit ad: public/ icinden degismeyen bir URL ile sunulur.
  await mkdir('public', { recursive: true });
  const ogPath = join('public', 'og-image.jpg');
  await sharp(join(SRC, OG_SOURCE))
    .rotate()
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(ogPath);
  const { size: ogSize } = await stat(ogPath);
  console.log(`  og-image.jpg (1200x630, ${kb(ogSize)} KB) <- ${OG_SOURCE}`);

  await writeFile(
    join(OUT, 'placeholders.json'),
    JSON.stringify(placeholders, null, 2) + '\n'
  );

  console.log(
    `
${files.length} kaynak ${kb(sourceBytes)} KB idi.
` +
      `Üretilen tüm türevler: ${kb(outputBytes)} KB ` +
      `(tarayıcı her görselden yalnızca birini indirir).
` +
      `Masaüstünde tüm sayfa için gerçek indirme (1280px WebP): ${kb(typicalBytes)} KB`
  );
}

main();
