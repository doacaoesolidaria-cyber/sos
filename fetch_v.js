import fs from 'fs';
fetch('https://sosanimalhelp.com/', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  }
}).then(r => r.text()).then(html => {
  const vids = html.match(/(?:youtube\.com|vimeo\.com|youtube-nocookie\.com|youtu\.be)\/[^\s"'<>\\]+/gi);
  console.log('VIDEOS MAP:', vids);
  const mp4s = html.match(/https?:\/\/[^\s"'<>\\]+\.(mp4|webm)/gi);
  console.log('MP4s:', mp4s);
});
