import archiver from 'archiver';
import { Readable } from 'stream';

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

   const zipFilename = 'scraped_data.zip';
   const archive = archiver('zip', {
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
   console.log(`Scraped data saved to ${zipFilename} in Google Cloud Storage.`);
   return file.createReadStream(); 

/*
   // Create a readable stream to serve the archive as a download
   const stream = Readable.from(archive, { objectMode: true });
   // Set the appropriate headers for the download
   const headers = {
    'Content-Type': 'application/zip',
    'Content-Disposition': `attachment; filename="${zipFilename}"`,
   };

   // Send the response with the archive stream and headers
   console.log('send');
   sendResponse({ stream, headers });
   */
  });
 }
}

export default CreateZipFilePlugin;
