import express from 'express';

const router = express.Router();
/*
router.get('/', (req, res) => {
 //const file = `${__dirname}/website-files-zipped/website.zip`;
 const file = `G:/JavascriptProjects/Donloaded Website Ziped/business-site-bb9671.webflow.io.zip`;
 res.download(file);
});
*/
router.get('/', (req, res) => {
 const file = `G:/JavascriptProjects/Website-downloader-WebApp/ziped/business-site-bb9671.webflow.io.zip`;
 const filename = 'business-site-bb9671.webflow.io.zip';
 res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
 res.download(file, filename);
});

export default router;
