import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.join(__dirname, '..');
const publicDirectory = path.join(__dirname, '..', 'public');
const logsDirectory = path.join(__dirname, '..', 'logs');
const downloadDirectory = path.join(publicDirectory, 'download');

export default {
 __filename,
 __dirname,
 downloadDirectory,
 rootPath,
 publicDirectory,
 logsDirectory,
};
