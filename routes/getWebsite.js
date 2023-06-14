import express from 'express';
import { getUrl } from '../controllers/getWebsite.js';
import { scrapeWebsite } from '../utils/scrape.js';

const router = express.Router();

router.post('/', getUrl);

router.get('/download/:directoryId', async (req, res) => {
 const { directoryId } = req.params;
 const { websiteUrlHost } = req.session;
 const zipPath = `download_directory/${directoryId}/${websiteUrlHost}.zip`;

 res.download(zipPath, `${websiteUrlHost}.zip`, (err) => {
  if (err) {
   console.error(err);
   res.status(500).json({ message: 'Error downloading the archive' });
  }
 });
});

export default router;
