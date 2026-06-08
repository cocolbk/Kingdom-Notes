/**
 * Generates Kingdom Notes app icon and splash screen PNG assets.
 * Run: npm run generate:assets
 */
const fs = require('fs');
const path = require('path');
const {PNG} = require('pngjs');

const PRIMARY = {r: 27, g: 58, b: 75, a: 255};
const ACCENT = {r: 201, g: 162, b: 39, a: 255};
const CREAM = {r: 247, g: 244, b: 239, a: 255};

const ROOT = path.join(__dirname, '..');
const ANDROID_RES = path.join(ROOT, 'android', 'app', 'src', 'main', 'res');

const MIPMAP_SIZES = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};

function ensureDir(dir) {
  fs.mkdirSync(dir, {recursive: true});
}

function setPixel(data, width, x, y, color) {
  const idx = (width * y + x) << 2;
  data[idx] = color.r;
  data[idx + 1] = color.g;
  data[idx + 2] = color.b;
  data[idx + 3] = color.a;
}

function fillRect(data, width, height, x, y, w, h, color) {
  for (let py = y; py < y + h && py < height; py++) {
    for (let px = x; px < x + w && px < width; px++) {
      setPixel(data, width, px, py, color);
    }
  }
}

function drawCircle(data, width, height, cx, cy, radius, color) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy <= radius * radius) {
        setPixel(data, width, x, y, color);
      }
    }
  }
}

function drawCross(data, width, height, cx, cy, size, thickness, color) {
  const half = Math.floor(size / 2);
  const thick = Math.max(2, Math.floor(thickness));
  fillRect(data, width, height, cx - thick, cy - half, thick * 2 + 1, size, color);
  fillRect(data, width, height, cx - Math.floor(half * 0.35), cy - Math.floor(half * 0.55), Math.floor(half * 0.7), Math.floor(half * 0.55), color);
}

function createIcon(size) {
  const png = new PNG({width: size, height: size});
  const {data} = png;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = PRIMARY.r;
    data[i + 1] = PRIMARY.g;
    data[i + 2] = PRIMARY.b;
    data[i + 3] = 255;
  }

  const margin = Math.floor(size * 0.08);
  drawCircle(data, size, size, size / 2, size / 2, size / 2 - margin, ACCENT);

  for (let i = 0; i < data.length; i += 4) {
    const x = (i >> 2) % size;
    const y = Math.floor((i >> 2) / size);
    const dx = x - size / 2;
    const dy = y - size / 2;
    if (dx * dx + dy * dy <= (size / 2 - margin - 2) ** 2) {
      data[i] = PRIMARY.r;
      data[i + 1] = PRIMARY.g;
      data[i + 2] = PRIMARY.b;
    }
  }

  drawCross(data, size, size, size / 2, size / 2, Math.floor(size * 0.42), Math.max(2, Math.floor(size * 0.07)), ACCENT);

  return png;
}

function createSplash(width, height) {
  const png = new PNG({width, height});
  const {data} = png;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = PRIMARY.r;
    data[i + 1] = PRIMARY.g;
    data[i + 2] = PRIMARY.b;
    data[i + 3] = 255;
  }

  const cx = width / 2;
  const cy = height / 2 - height * 0.05;
  const crossSize = Math.min(width, height) * 0.15;
  drawCross(data, width, height, cx, cy, crossSize, crossSize * 0.12, ACCENT);

  const titleY = cy + crossSize * 0.8;
  const barWidth = width * 0.35;
  fillRect(data, width, height, cx - barWidth / 2, titleY, barWidth, Math.max(3, height * 0.012), CREAM);
  fillRect(data, width, height, cx - barWidth * 0.3, titleY + height * 0.025, barWidth * 0.6, Math.max(2, height * 0.006), ACCENT);

  return png;
}

function writePng(png, filePath) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, PNG.sync.write(png));
  console.log(`  Created ${path.relative(ROOT, filePath)}`);
}

function generateIcons() {
  console.log('Generating app icons...');
  Object.entries(MIPMAP_SIZES).forEach(([folder, size]) => {
    const icon = createIcon(size);
    const dir = path.join(ANDROID_RES, folder);
    writePng(icon, path.join(dir, 'ic_launcher.png'));
    writePng(icon, path.join(dir, 'ic_launcher_round.png'));
  });
}

function generateSplash() {
  console.log('Generating splash screen...');
  const splash = createSplash(480, 800);
  writePng(splash, path.join(ANDROID_RES, 'drawable', 'splash.png'));
}

function generateAdaptiveIconXml() {
  const dir = path.join(ANDROID_RES, 'mipmap-anydpi-v26');
  ensureDir(dir);

  const adaptiveIcon = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/primary"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
</adaptive-icon>
`;

  fs.writeFileSync(path.join(dir, 'ic_launcher.xml'), adaptiveIcon);
  fs.writeFileSync(path.join(dir, 'ic_launcher_round.xml'), adaptiveIcon);
  console.log('  Created adaptive icon XML');
}

function generateForegroundVector() {
  const drawableDir = path.join(ANDROID_RES, 'drawable');
  ensureDir(drawableDir);

  const foreground = `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <group
        android:scaleX="0.5"
        android:scaleY="0.5"
        android:translateX="27"
        android:translateY="27">
        <path
            android:fillColor="#C9A227"
            android:pathData="M54,20 L54,88 M30,44 L78,44 M30,44 L30,32 L78,32 L78,44"/>
    </group>
</vector>
`;

  fs.writeFileSync(path.join(drawableDir, 'ic_launcher_foreground.xml'), foreground);
  console.log('  Created ic_launcher_foreground.xml');
}

function main() {
  console.log('Kingdom Notes — Asset Generator\n');
  generateIcons();
  generateSplash();
  generateAdaptiveIconXml();
  generateForegroundVector();
  console.log('\nDone! Assets generated successfully.');
}

main();
