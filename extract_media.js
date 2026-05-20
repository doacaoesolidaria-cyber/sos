import fs from 'fs';

const html = fs.readFileSync('site.html', 'utf8');
const urls = html.match(/https?:\/\/[^\s"'<>\\]+\.(mp4|webm|jpg|jpeg|png|webp|gif)/gi);
console.log(Array.from(new Set(urls)).join('\n'));
