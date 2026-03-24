const fs = require('fs');
const https = require('https');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Failed to get ' + url + ' - status ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(resolve); });
    }).on('error', (err) => { 
        console.error(err);
        fs.unlink(dest, () => reject(err)); 
    });
  });
};

Promise.all([
  download('https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Brawl_Stars_logo.svg/512px-Brawl_Stars_logo.svg.png', 'C:\\Users\\jaatp\\.antigravity\\brawl-stars-luxury\\public\\landing.png'),
  download('https://www.xtrafondos.com/wallpapers/brawl-stars-2538.jpg', 'C:\\Users\\jaatp\\.antigravity\\brawl-stars-luxury\\public\\bg.jpg')
]).then(() => console.log('Downloaded successfully')).catch(console.error);
