import { readdir, stat, readFile, writeFile } from 'fs';
import { join, extname } from 'path';

const badgeTexts = [
 new RegExp(
    'if\\s*\\(\\s*shouldBrand\\s*&&\\s*!\\s*isPhantom\\s*\\)\\s*{\\s*brandElement\\s*=\\s*brandElement\\s*\\|\\|\\s*createBadge\\(\\);\\s*ensureBrand\\(\\);\\s*setTimeout\\(ensureBrand,\\s*500\\);\\s*\\$\\(doc\\)\\.off\\(fullScreenEvents,\\s*onFullScreenChange\\)\\.on\\(fullScreenEvents,\\s*onFullScreenChange\\);\\s*}',
    'gm'
    ), // prettier-ignore
 new RegExp('\\.w-webflow-badge', 'g'), // prettier-ignore
 new RegExp('function createBadge\(\)\s*{\s*(?:\/\/.*\r?\n)*\s*[^}]+}', 'g'), // prettier-ignore
 'c.hostname !== p && (u = !0)',
 'shouldBrand = true',
];

async function removeBadge(folder, arr) {
 readdir(folder, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
   const filePath = join(folder, file);
   stat(filePath, (err, stats) => {
    if (err) throw err;

    if (stats.isDirectory()) {
     removeBadge(filePath, arr);
    } else if (stats.isFile() && extname(file) === '.js') {
     readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err;

      let modifiedData = data;

      // remove each text from the array
      arr.forEach((text, index) => {
       if (index === 3) {
        return (modifiedData = modifiedData.replace(text, 'c.hostname !== p && (u = 0)'));
       }
       if (index === 4) {
        return (modifiedData = modifiedData.replace(text, 'shouldBrand = false'));
       }
       modifiedData = modifiedData.replace(text, '');
       console.log('badge removed');
      });

      // save the file overwriting the old one
      writeFile(filePath, modifiedData, (err) => {
       if (err) throw err;
      });
     });
    }
   });
  });
 });
}

export { removeBadge, badgeTexts };
