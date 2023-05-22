import { rimraf } from 'rimraf';
import fs from 'fs';

function emptyDownloadDir(downloadDirectory) {
 // Get a list of files and directories inside the downloadDirectory
 const files = fs.readdirSync(downloadDirectory);
 // Delete each file and directory inside the downloadDirectory
 files.forEach((file) => {
  rimraf.sync(`${downloadDirectory}/${file}`);
 });
 return console.log('Download directory cleared!');
}

export { emptyDownloadDir };
