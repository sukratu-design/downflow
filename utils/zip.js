import { zip } from 'zip-a-folder';
import { promises as fs } from 'fs';
import Url from 'url-parse';

async function zipFile(formData) {
 const { websiteUrl } = formData;
 const parsedUrl = new Url(websiteUrl);
 const dest = `G:/JavascriptProjects/Donloaded Website Ziped/${parsedUrl.host}.zip`;
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
 await zip(`G:/JavascriptProjects/Donloaded Website/${parsedUrl.host}`, dest);
}

export { zipFile };
