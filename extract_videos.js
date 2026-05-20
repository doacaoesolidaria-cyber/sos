import fs from 'fs';

const html = fs.readFileSync('site.html', 'utf8');
const ytUrls = html.match(/(youtube|vimeo)[^\s"'<>\\]+/gi);
console.log(Array.from(new Set(ytUrls || [])).join('\n'));
