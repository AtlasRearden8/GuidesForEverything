// Generates the landing page's tiling starfield layers (assets/stars-*.svg).
// Deterministic: the same seed always draws the same sky. Run: node tools/make-starfield.mjs
import fs from 'node:fs';
let s = 20261017;
const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
const tile = 1400;
function layer(file, n, rMin, rMax, oMin, oMax) {
  const stars = [];
  for (let i = 0; i < n; i++) {
    const x = (rnd() * tile).toFixed(1), y = (rnd() * tile).toFixed(1);
    const r = (rMin + Math.pow(rnd(), 3) * (rMax - rMin)).toFixed(2);
    const o = (oMin + rnd() * (oMax - oMin)).toFixed(2);
    // a few stars run warm or cool, like real stellar colour
    const t = rnd();
    const fill = t < 0.12 ? '#ffd9b0' : t < 0.3 ? '#cfe0ff' : '#ffffff';
    stars.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" fill-opacity="${o}"/>`);
  }
  fs.writeFileSync(file, `<svg xmlns="http://www.w3.org/2000/svg" width="${tile}" height="${tile}" viewBox="0 0 ${tile} ${tile}">${stars.join('')}</svg>\n`);
}
layer('assets/stars-far.svg', 520, 0.35, 0.9, 0.25, 0.7);
layer('assets/stars-near.svg', 140, 0.6, 1.6, 0.55, 0.95);
layer('assets/stars-twinkle.svg', 46, 0.9, 1.9, 0.8, 1);
console.log('starfield written');
