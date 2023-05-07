import express from 'express';
import paths from '../utils/paths.js';
import logger from '../utils/logger.js';
import fs from 'fs';
import { rimraf } from 'rimraf';

const router = express.Router();
const { downloadDirectory } = paths;

router.use((req, res, next) => {
 const { directoryId } = req.session;
 if (!directoryId) {
  return res.status(400).json({ error: 'Unique folder not found in session.' });
 }
 next();
});

router.get('/', async (req, res) => {
 const directoryId = req.session.directoryId;
 const websiteUrlHost = req.session.websiteUrlHost;
 console.log({ directoryId, websiteUrlHost });
 const outputFilePath = `${downloadDirectory}/${directoryId}/${websiteUrlHost}.zip`;

 function downloadFile(filePath) {
  return new Promise((resolve, reject) => {
   res.download(filePath, (err) => {
    if (err) {
     reject(err);
    } else {
     resolve();
    }
   });
  });
 }

 try {
  await downloadFile(outputFilePath);
  logger.info(`File downloaded: ${outputFilePath}`);
  fs.closeSync(fs.openSync(outputFilePath, 'r'));
  setTimeout(() => {
   rimraf.sync(`${downloadDirectory}/${directoryId}`);
   logger.info(`Directory deleted: ${downloadDirectory}/${directoryId}`);
  }, 120000); // wait for 2 minute before deleting
 } catch (err) {
  logger.error(`Error downloading file: ${outputFilePath}`, err);
  res.status(500).send('Error downloading file.');
 }
});
export default router;
