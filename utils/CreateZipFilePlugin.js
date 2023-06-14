import archiver from 'archiver';

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
    const fileContent = resource.getText();
    const encoding = resource.getEncoding();

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

//savingLocaly('zipFilename.zip', archive);
function savingLocaly(zipFilename, archive) {
 const outputStream = fs.createWriteStream(zipFilename);
 archive.pipe(outputStream);

 // Event handler for when the archive finishes writing
 outputStream.on('close', () => {
  console.log(`Scraped data saved to ${zipFilename}.`);
 });

 // Event handler for any errors during writing
 outputStream.on('error', (err) => {
  console.error('Error saving the archive:', err);
 });
}
