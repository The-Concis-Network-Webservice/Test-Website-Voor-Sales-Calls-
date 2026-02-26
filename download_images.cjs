const fs = require('fs');

fetch('https://unsplash.com/napi/search/photos?query=luxury+dark+restaurant&per_page=4')
  .then(res => res.json())
  .then(async data => {
    let i = 1;
    for (const r of data.results) {
      const url = r.urls.regular;
      const arr = await fetch(url).then(res => res.arrayBuffer());
      fs.writeFileSync(`C:/Users/maxma/.gemini/antigravity/brain/57eb2c2c-8dab-43e8-b608-afe68c206f27/opt${i}.jpg`, Buffer.from(arr));
      console.log(`Saved opt${i}.jpg`);
      i++;
    }
  }).catch(err => console.error(err));
