import fs from 'fs';
const html = fs.readFileSync('site.html', 'utf8');
const i = html.indexOf('video');
console.log(html.substring(Math.max(0, i - 100), Math.min(html.length, i + 300)));
