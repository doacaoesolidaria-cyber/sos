import https from 'https';
import fs from 'fs';

https.get('https://sosanimalhelp.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('site.html', data);
    console.log('Site saved to site.html');
  });
}).on('error', (err) => {
  console.log('Error: ', err.message);
});
