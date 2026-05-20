import fs from 'fs';

const html = fs.readFileSync('site.html', 'utf8');
const lines = html.split('\n');
lines.forEach((line, i) => {
  if (line.toLowerCase().includes('video')) {
    console.log(`Line ${i + 1}: ${line.trim().substring(0, 100)}`);
  }
});
