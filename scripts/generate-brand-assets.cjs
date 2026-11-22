// Generate Natural Grammar's icon, splash and favicon with Node.js built-ins.
// Run automatically after npm ci/install; no external image tooling is needed.
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");

const ROOT = path.join(__dirname, "..", "assets", "branding");
const PUBLIC = path.join(__dirname, "..", "public");
const C = {
  teal: [18, 109, 101],
  cream: [255, 249, 241],
  peach: [247, 198, 167],
  mint: [189, 232, 202],
  gold: [255, 209, 122],
};
function canvas(w, h, color) {
  const data = Buffer.alloc(w * h * 4);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = color[0]; data[i + 1] = color[1]; data[i + 2] = color[2]; data[i + 3] = 255;
  }
  return { w, h, data };
}
function pixel(img, x, y, color) {
  if (x < 0 || y < 0 || x >= img.w || y >= img.h) return;
  const i = (y * img.w + x) * 4;
  img.data[i] = color[0]; img.data[i + 1] = color[1]; img.data[i + 2] = color[2];
}
function polygon(img, points, color) {
  const ymin = Math.max(0, Math.floor(Math.min(...points.map(p => p[1]))));
  const ymax = Math.min(img.h - 1, Math.ceil(Math.max(...points.map(p => p[1]))));
  for (let y = ymin; y <= ymax; y++) {
    const hits = [];
    for (let j = 0; j < points.length; j++) {
      const [x1, y1] = points[j], [x2, y2] = points[(j + 1) % points.length];
      if ((y1 <= y && y2 > y) || (y2 <= y && y1 > y))
        hits.push(x1 + (y - y1) * (x2 - x1) / (y2 - y1));
    }
    hits.sort((a, b) => a - b);
    for (let i = 0; i + 1 < hits.length; i += 2)
      for (let x = Math.max(0, Math.ceil(hits[i])); x <= Math.min(img.w - 1, Math.floor(hits[i + 1])); x++)
        pixel(img, x, y, color);
  }
}
function ellipse(img, cx, cy, rx, ry, color) {
  const start = Math.max(0, Math.floor(cy - ry));
  const end = Math.min(img.h - 1, Math.ceil(cy + ry));
  for (let y = start; y <= end; y++) {
    const dx = rx * Math.sqrt(Math.max(0, 1 - ((y - cy) / ry) ** 2));
    for (let x = Math.max(0, Math.ceil(cx - dx)); x <= Math.min(img.w - 1, Math.floor(cx + dx)); x++)
      pixel(img, x, y, color);
  }
}
function drawMark(img, ox, oy, size, onLight = false) {
  const p = ([x, y]) => [ox + x * size / 1024, oy + y * size / 1024];
  const poly = (points, color) => polygon(img, points.map(p), color);
  poly([[160,565],[275,540],[450,580],[510,660],[510,850],[430,785],[300,745],[160,760]], onLight ? C.teal : C.cream);
  poly([[864,565],[749,540],[574,580],[514,660],[514,850],[594,785],[724,745],[864,760]], onLight ? C.teal : C.cream);
  poly([[165,790],[300,775],[440,810],[512,880],[584,810],[724,775],[859,790],[859,850],[724,825],[584,860],[512,925],[440,860],[300,825],[165,850]], C.peach);
  ellipse(img, ox + 448*size/1024, oy + 474*size/1024, 60*size/1024, 65*size/1024, C.mint);
  ellipse(img, ox + 576*size/1024, oy + 474*size/1024, 60*size/1024, 65*size/1024, C.mint);
  poly([[512,270],[535,335],[600,358],[535,381],[512,446],[489,381],[424,358],[489,335]], C.gold);
}
const crcTable = Array.from({ length: 256 }, (_, i) => {
  let c = i; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(data) {
  let c = 0xffffffff; for (const byte of data) c = crcTable[(c ^ byte) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const name = Buffer.from(type);
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([len, name, data, crc]);
}
function writePng(name, img, outputDir = ROOT) {
  const raw = Buffer.alloc((img.w * 4 + 1) * img.h);
  for (let y = 0; y < img.h; y++) {
    const off = y * (img.w * 4 + 1);
    raw[off] = 0;
    img.data.copy(raw, off + 1, y * img.w * 4, (y + 1) * img.w * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(img.w, 0); ihdr.writeUInt32BE(img.h, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  const png = Buffer.concat([
    Buffer.from([137,80,78,71,13,10,26,10]),
    chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))
  ]);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, name), png);
}
const icon = canvas(1024, 1024, C.teal);
drawMark(icon, 0, 0, 1024);
writePng("icon.png", icon);
const splash = canvas(1200, 1200, C.cream);
drawMark(splash, 300, 300, 600, true);
writePng("splash.png", splash);
const foreground = canvas(1024, 1024, C.teal);
drawMark(foreground, 128, 128, 768);
writePng("adaptive-icon.png", foreground);
const favicon = canvas(64, 64, C.teal);
drawMark(favicon, 0, 0, 64);
writePng("favicon.png", favicon);
// Files in public/ are copied to the Expo Hosting web output unchanged.
// The Apple touch icon must be a real PNG served at a stable absolute URL.
const appleTouchIcon = canvas(180, 180, C.teal);
drawMark(appleTouchIcon, 0, 0, 180);
writePng("apple-touch-icon.png", appleTouchIcon, PUBLIC);
const webIcon = canvas(192, 192, C.teal);
drawMark(webIcon, 0, 0, 192);
writePng("icon-192.png", webIcon, PUBLIC);
const webIconLarge = canvas(512, 512, C.teal);
drawMark(webIconLarge, 0, 0, 512);
writePng("icon-512.png", webIconLarge, PUBLIC);
console.log("Generated Natural Grammar branding PNG assets.");
