import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const downloadDirectory = path.join(__dirname, '../download');
const zippedDirectory = path.join(__dirname, '../zipped');
const rootPath = path.join(__dirname, '../');
const publicDirectory  = path.join(__dirname, '../public');


export default {
 __filename,
 __dirname,
 downloadDirectory,
 zippedDirectory,
 rootPath,
 publicDirectory
};
