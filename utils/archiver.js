import fs from 'fs';
import archiver from 'archiver';
import paths from './paths.js';

const { downloadDirectory, zippedDirectory } = paths;

const createZipFile = async (websiteUrlHost, folderPathWithTimestamp) => {
 const archive = archiver('zip', { zlib: { level: 9 } });

 //const outputFilePath = path.join(zippedDirectory, `${path.basename(folderPath)}.zip`);
 const outputFilePath = `${zippedDirectory}/${websiteUrlHost}.zip`;

 const output = fs.createWriteStream(outputFilePath);

 return new Promise((resolve, reject) => {
  archive
   .directory(folderPathWithTimestamp, false)
   .on('error', (err) => reject(err))
   .pipe(output);

  output.on('close', () => resolve(outputFilePath));

  archive.finalize();
 });
};

export { createZipFile };
