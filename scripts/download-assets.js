import fs from 'fs';
import https from 'https';
import path from 'path';

const urls = [
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/ChatGPT_Image_29_04_2026__14_16_37-removebg-preview.png",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/ChatGPT_Image_29_04_2026__14_19_53-removebg-preview.png",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/ChatGPT_Image_29_04_2026__14_09_58-removebg-preview.png",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/ChatGPT_Image_29_04_2026__14_22_49-removebg-preview.png",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/ChatGPT_Image_29_04_2026__19_10_21-removebg-preview-rmqni74p1zqibihkjgy8wfacw7r806b4irj2f39s4g.png",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/ChatGPT-Image-29_04_2026-19_05_29-rmqn9z1j96h6qcfnkeyrl005rualninoe2148xgskg.png",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/ChatGPT-768x432.webp",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/eles.webp",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/ChatGPT_Image_30_04_2026__15_00_12-removebg-preview.png",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/J1.webp",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/S1.webp",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/A2.webp",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/M2.webp",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/S2.webp",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/S3.webp",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/A1.webp",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/A3.webp",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/doacao_segura_fundo_transparente.webp",
  "https://sosanimalhelp.org/wp-content/uploads/2026/05/ChatGPT_Image_30_04_2026__15_38_18-removebg-preview.png"
];

const download = async (url, dest) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
  } finally {
    clearTimeout(timeout);
  }
};

async function run() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('Downloading assets for Vercel deployment...');
  for (const url of urls) {
    const filename = path.basename(url);
    const dest = path.join(publicDir, filename);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`Already have ${filename}, skipping.`);
      continue;
    }
    console.log(`Downloading ${filename}...`);
    try {
      await download(url, dest);
      console.log(`Saved ${filename}`);
    } catch (e) {
      console.error(`Error downloading ${filename}: ${e.message}`);
    }
  }
}

run();
