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

const download = (url, dest) => new Promise((resolve, reject) => {
  https.get(url, { rejectUnauthorized: false }, (res) => {
    if (res.statusCode !== 200) {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      reject(new Error(`Failed to get ${url} (status code: ${res.statusCode})`));
      return;
    }
    const data = [];
    res.on('data', chunk => data.push(chunk));
    res.on('end', () => {
      const buffer = Buffer.concat(data);
      fs.writeFileSync(dest, buffer);
      resolve();
    });
  }).on('error', err => reject(err));
});

async function run() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('Downloading assets for build...');
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
