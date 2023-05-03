import express from 'express';
import paths from '../utils/paths.js';
import logger from '../utils/logger.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const { zippedDirectory, downloadDirectory } = paths;

router.get('/:filename', async (req, res) => {
 const filename = req.params.filename;
 const filepath = `${zippedDirectory}/${filename}`;
 console.log(filepath);
 logger.info(`Downloading file: ${filepath}`);
 res.download(filepath, async (err) => {
  if (err) {
   logger.error(`Error downloading file: ${filepath}`, err);
   res.status(500).send('Error downloading file.');
  } else {
   logger.info(`File downloaded: ${filepath}`);

   // Delete the downloaded folder and the zip file
   /*
   const zipFilePath = path.join(zippedDirectory, filename);
   const folderPath = path.join(zippedDirectory, filename.replace('.zip', ''));
   console.log({ zipFilePath, folderPath });
   try {
    await fs.promises.unlink(zipFilePath);
    await fs.promises.rmdir(folderPath, { recursive: true });
    logger.info(`Folder and zip file deleted: ${folderPath}, ${zipFilePath}`);
   } catch (err) {
    logger.error(`Error deleting folder and zip file: ${folderPath}, ${zipFilePath}`, err);
   }
   */
  }
 });
});

export default router;
