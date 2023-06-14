import express from 'express';

const router = express.Router();

router.post('/');

router.get('/download/:fileName', async (req, res) => {
 const { fileName } = req.params;
 console.log({ fileName });
 //const { websiteUrlHost } = req.session;
 //const zipPath = `download_directory/${directoryId}/${websiteUrlHost}.zip`;
 const zipPath = `G:\\JavascriptProjects\\Website-downloader-WebApp\\`;

 res.download(zipPath, `${fileName}`, (err) => {
  if (err) {
   console.error(err);
   res.status(500).json({ message: 'Error downloading the archive' });
  }
 });
});

export default router;
