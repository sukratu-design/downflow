import { fileURLToPath } from 'url';
import path from 'path';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({ projectId: 'website-downloader-387015'});

async function uploadFile(bucketName, filePath, destinationFileName) {
  const bucket = storage.bucket(bucketName);
  await bucket.upload(filePath, { destination: destinationFileName });
  console.log('File uploaded successfully.');
}


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const development = {
 __filename,
 __dirname,
 rootPath: path.join(__dirname, '..'),
 publicDirectory: path.join(__dirname, '..', 'public'),
 logsDirectory: path.join(__dirname, '..', 'logs'),
 downloadDirectory: path.join(__dirname, '..', 'public', 'download'),
};

const production = {
 __filename,
 __dirname,
 rootPath: path.join(__dirname, '..'),
 publicDirectory: path.join(__dirname, '..', 'public'),
 logsDirectory: 'gs://logs_directory',
 downloadDirectory: 'gs://download_directory', 
};

export default process.env.NODE_ENV === 'production' ? production : development;
