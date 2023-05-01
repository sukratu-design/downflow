import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
 const file = `G:/JavascriptProjects/Website-downloader-WebApp/zipped/business-site-bb9671.webflow.io.zip`;
 const filename = 'business-site-bb9671.webflow.io.zip';
 res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
 res.download(file, filename);
});

export default router;
