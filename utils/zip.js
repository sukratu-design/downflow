import { zip } from 'zip-a-folder';
import { promises as fs } from 'fs';

async function zipFile() {
 const dest = 'G:/JavascriptProjects/Donloaded Website Ziped/website.zip';
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
 await zip('G:/JavascriptProjects/Donloaded Website', dest);
}

export { zipFile };
