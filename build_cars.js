const fs = require('fs');
const path = require('path');

const carsDir = 'C:/Users/HP/AS-CAR-GROUP/cars';
const data = {};

const files = fs.readdirSync(carsDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
for (const f of files) {
  const fpath = path.join(carsDir, f);
  const ext = f.split('.').pop().toLowerCase();
  const mime = (ext === 'png') ? 'image/png' : 'image/jpeg';
  const b64 = fs.readFileSync(fpath).toString('base64');
  const key = f.replace(/\.[^.]+$/, '');
  data[key] = 'data:' + mime + ';base64,' + b64;
}

const output = 'const CAR_IMAGES = ' + JSON.stringify(data) + ';\n';
fs.writeFileSync('C:/Users/HP/AS-CAR-GROUP/car_images.js', output);
console.log('Encoded ' + Object.keys(data).length + ' car images, size: ' + Math.round(output.length / 1024) + ' KB');
