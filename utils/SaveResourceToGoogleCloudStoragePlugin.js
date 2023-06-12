import { Storage } from '@google-cloud/storage';
import archiver from 'archiver';
const projectId = 'website-downloader-387015';
const keyFilename = 'G:/JavascriptProjects/Website-downloader-WebApp/config/mykey.json';

const storage = new Storage({ projectId, keyFilename });
class SaveResourceToGoogleCloudStoragePlugin {
 apply(registerAction) {
  let bucketName;
  const loadedResources = [];

  registerAction('beforeStart', ({ options }) => {
   if (!options.directory || typeof options.directory !== 'string') {
    throw new Error(`Incorrect directory ${options.directory}`);
   }

   bucketName = options.directory;
  });

  registerAction('saveResource', async ({ resource }) => {
   loadedResources.push(resource);
  });

  registerAction('afterFinish', async () => {
   if (loadedResources.length === 0) {
    return;
   }

   const zipFilename = 'scraped_data.zip';
   const bucket = storage.bucket(bucketName);
   const file = bucket.file(zipFilename);

   const archive = archiver('zip', {
    zlib: { level: 9 }, // Compression level (0 to 9)
   });

   archive.pipe(file.createWriteStream());

   for (const resource of loadedResources) {
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

   await archive.finalize();
   console.log(`Scraped data saved to ${zipFilename} in Google Cloud Storage.`);
  });

  registerAction('error', async () => {
   if (loadedResources.length > 0) {
    const bucket = new Storage().bucket(bucketName);
    await Promise.all(
     loadedResources.map((resource) => bucket.file(resource.getFilename()).delete())
    );
   }
  });
 }
}

export default SaveResourceToGoogleCloudStoragePlugin;
