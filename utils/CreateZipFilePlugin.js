import archiver from 'archiver';
import { removeBadge, badgeTexts } from '../utils/removeBadge.js';

let archive;

class CreateZipFilePlugin {
 constructor() {
  this.loadedResources = [];
 }

 apply(registerAction) {
  registerAction('saveResource', async ({ resource }) => {
   this.loadedResources.push(resource);
  });

  registerAction('afterFinish', async ({ options, sendResponse }) => {
   if (this.loadedResources.length === 0) {
    return;
   }
   archive = archiver('zip', {
    zlib: { level: 9 }, // Compression level (0 to 9)
   });

   for (const resource of this.loadedResources) {
    const fileName = resource.getFilename();
    let fileContent = resource.getText();
    const encoding = resource.getEncoding();
    const type = resource.getType();

    if (type === 'js') {
     fileContent = await removeBadge(fileContent, badgeTexts);
    }

    if (encoding === 'utf8') {
     archive.append(fileContent, { name: fileName, encoding: 'utf8' });
    } else {
     const buffer = Buffer.from(fileContent, 'binary');
     archive.append(buffer, { name: fileName });
    }
   }
   archive.finalize();
  });
 }
}

export { CreateZipFilePlugin, archive };
