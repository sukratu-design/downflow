import { v4 as uuidv4 } from 'uuid';
//import { body, validationResult } from 'express-validator';
import { scrapeWebsite } from '../utils/scrape.js';
//import { createZipFile } from '../utils/archiver.js';
import Url from 'url-parse';

async function getUrl(req, res) {
 const formData = req.body;
 const { websiteUrl } = formData;
 const parsedUrl = new Url(websiteUrl);
 const websiteUrlHost = parsedUrl.host;
 const directoryId = uuidv4();

 req.session.directoryId = directoryId;
 req.session.websiteUrlHost = websiteUrlHost;
 if (!websiteUrl) {
  res.status(400).json({ message: 'Please enter a valid URL' });
  return;
 }

 try {
  const scrapedData = await scrapeWebsite(formData, directoryId, websiteUrlHost);

  //createZipFile(websiteUrlHost, directoryId);

  res.status(200).send({
   message: 'You can now download',
   websiteUrlHost,
  });
  return;
 } catch (err) {
  res.status(400).json({ message: err.message });
 }
}

export { getUrl };
