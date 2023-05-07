import fs from 'fs';
import archiver from 'archiver';
import paths from './paths.js';

const { downloadDirectory } = paths;

const createZipFile = async (websiteUrlHost, directoryId) => {
 const archive = archiver('zip', { zlib: { level: 9 } });

 const outputDirectory = `${downloadDirectory}/${directoryId}/${websiteUrlHost}`;
 const outputFilePath = `${outputDirectory}.zip`;

 const output = fs.createWriteStream(outputFilePath);

 return new Promise((resolve, reject) => {
  archive
   .directory(outputDirectory, false)
   .on('error', (err) => reject(err))
   .pipe(output);

  output.on('close', () => resolve(outputFilePath));

  archive.finalize();
 });
};

export { createZipFile };
