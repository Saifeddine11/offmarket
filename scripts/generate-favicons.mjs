// One-off: rasterize the existing official OFF MARKET "OM" monogram (the
// current site favicon SVG) into PNG favicon variants. Does NOT redesign or
// recolor — it renders the exact existing brand mark at multiple sizes.
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const BG = "#565449"; // official brand square (matches theme_color / manifest)
const FG = "#F1EBEB"; // official brand foreground

function omSvg(size) {
  const radius = Math.round(size * 0.125);
  const fontSize = size * 0.34;
  const y = size * 0.655;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="OFF MARKET">
  <rect width="${size}" height="${size}" rx="${radius}" fill="${BG}"/>
  <text x="${size / 2}" y="${y}" text-anchor="middle" font-family="Helvetica, Arial, system-ui, sans-serif" font-size="${fontSize}" font-weight="700" fill="${FG}" letter-spacing="${size * 0.01}">OM</text>
</svg>`,
  );
}

// [filename, size]
const OUTPUTS = [
  ["favicon-16x16.png", 16],
  ["favicon-32x32.png", 32],
  ["favicon-96x96.png", 96],
  ["apple-touch-icon.png", 180],
  ["android-chrome-192x192.png", 192],
  ["android-chrome-512x512.png", 512],
];

const TREES = ["public/assets/manifest", "assets/manifest"];

for (const tree of TREES) {
  mkdirSync(tree, { recursive: true });
  for (const [name, size] of OUTPUTS) {
    await sharp(omSvg(size), { density: 384 })
      .resize(size, size, { fit: "contain" })
      .png()
      .toFile(`${tree}/${name}`);
    console.log(`wrote ${tree}/${name} (${size}x${size})`);
  }
}
console.log("done");
