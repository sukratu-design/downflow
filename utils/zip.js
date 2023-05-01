import path from 'path';
import { fileURLToPath } from 'url';
import { zip } from 'zip-a-folder';
import { promises as fs } from 'fs';
import Url from 'url-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const zippedFolder = path.join(__dirname, '../ziped');
const sourceFolder = path.join(__dirname, '../download');
console.log({ zippedFolder, sourceFolder });

async function zipFile(formData) {
 const { websiteUrl } = formData;
 const parsedUrl = new Url(websiteUrl);
 //const dest = `G:/JavascriptProjects/Donloaded Website Ziped/${parsedUrl.host}.zip`;
 const dest = `${zippedFolder}/${parsedUrl.host}.zip`;
 try {
  const stat = await fs.stat(dest);
  if (stat.isFile()) {
   await fs.unlink(dest);
  }
 } catch (err) {
  if (err.code !== 'ENOENT') {
   throw err;
  }
 }
 await zip(`${sourceFolder}/${parsedUrl.host}`, dest);
}

export { zipFile };
