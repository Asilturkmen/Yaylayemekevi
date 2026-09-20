/**
 * public/favicon.svg kaynagindan tarayici ikonlarini uretir.
 *
 * Kullanim: npm run icons  (prebuild ile otomatik calisir)
 *
 * Uretilenler:
 *   favicon.ico          16/32/48 px, eski tarayicilar ve /favicon.ico isteyen araclar icin
 *   apple-touch-icon.png 180x180, iOS ana ekrana eklendiginde
 *   icon-192.png         Android ana ekran / PWA boyutu
 *   icon-512.png         yuksek cozunurluk
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const PUBLIC = 'public';
const SOURCE = join(PUBLIC, 'favicon.svg');
/** favicon.svg icindeki karonun rengi; seffaf olamayacak yerlerde zemin olur. */
const TILE_BG = '#FAEFDA';

/**
 * opaque: seffaf pikselleri verilen renkle doldurur. resize'in background
 * secenegi yetmez; o yalnizca en-boy farkindan dogan bosluga uygulanir,
 * kaynaktaki alfayi duzlestirmez. Karonun yuvarlak koseleri bu yuzden
 * seffaf kaliyordu.
 */
const png = async (size, { opaque } = {}) => {
  let image = sharp(await readFile(SOURCE), { density: 384 }).resize(size, size);
  if (opaque) image = image.flatten({ background: opaque });
  return image.png({ compressionLevel: 9 }).toBuffer();
};

/**
 * ICO dosyasi yazar. Vista sonrasi ICO, PNG verisini dogrudan gomebilir;
 * bu yuzden her boyutun PNG'sini basliga ekleyip pesine yaziyoruz.
 */
const buildIco = (images) => {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // ayrilmis
  header.writeUInt16LE(1, 2); // tip: 1 = ikon
  header.writeUInt16LE(count, 4);

  const entries = [];
  let offset = 6 + count * 16;

  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    // 256px, ICO basliginda 0 olarak yazilir
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palet rengi yok
    entry.writeUInt8(0, 3); // ayrilmis
    entry.writeUInt16LE(1, 4); // duzlem
    entry.writeUInt16LE(32, 6); // bit derinligi
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
};

const main = async () => {
  const icoSizes = [16, 32, 48];
  const icoImages = await Promise.all(
    icoSizes.map(async (size) => ({ size, data: await png(size) }))
  );
  const ico = buildIco(icoImages);
  await writeFile(join(PUBLIC, 'favicon.ico'), ico);

  // iOS ana ekran ikonu seffaflik desteklemez: yuvarlak kose paylari karo rengiyle dolduruluyor.
  await writeFile(join(PUBLIC, 'apple-touch-icon.png'), await png(180, { opaque: TILE_BG }));
  await writeFile(join(PUBLIC, 'icon-192.png'), await png(192));
  await writeFile(join(PUBLIC, 'icon-512.png'), await png(512));

  const kb = (n) => Math.max(1, Math.round(n / 1024));
  console.log(`  favicon.ico          ${icoSizes.join('/')} px, ${kb(ico.length)} KB`);
  console.log('  apple-touch-icon.png 180x180');
  console.log('  icon-192.png / icon-512.png');
};

main();
