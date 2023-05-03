import { zip } from 'zip-a-folder';
import { promises as fs } from 'fs';
import paths from './paths.js';

const { downloadDirectory, zippedDirectory } = paths;

async function zipFile(websiteUrlHost, folderPathWithTimestamp) {
 const dest = `${zippedDirectory}/${websiteUrlHost}.zip`;
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
 await zip(`${folderPathWithTimestamp}`, dest);
}

export { zipFile };
