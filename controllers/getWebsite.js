import { body, validationResult } from 'express-validator';
import { scrapeWebsite } from '../utils/scrape.js';
import { zipFile } from '../utils/zip.js';
import Url from 'url-parse';

async function getUrl(req, res) {
 const formData = req.body;
 const { websiteUrl } = formData;
 const parsedUrl = new Url(websiteUrl);
 const websiteUrlHost = parsedUrl.host;

 try {
  const scrapedData = await scrapeWebsite(formData);
  zipFile(websiteUrlHost);

  res.status(200).send({ 
    message: 'You can now download',
    websiteUrlHost  
  });
  return;
 } catch (err) {
  res.status(400).json({ message: err.message });
 }
}

/*
async function getUrl(req, res) {
 const formData = req.body;

 // Sanitize and validate the websiteUrl field using the express-validator middleware
 await body('websiteUrl')
  .not()
  .isEmpty()
  .withMessage('Website URL is required')
  .isURL({ require_protocol: true, protocols: ['http', 'https'] })
  .withMessage('Invalid URL')
  .escape()
  .run(req);

 // Sanitize and validate the git field using the express-validator middleware
 await body('git').isBoolean().withMessage('Invalid value for git').optional().run(req);

 // Sanitize and validate the depth field using the express-validator middleware
 await body('depth')
  .not()
  .isEmpty()
  .withMessage('Depth is required')
  .isInt({ min: 1, max: 10 })
  .withMessage('Invalid depth')
  .toInt()
  .run(req);

 // Check for validation errors
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }

 // If there are no validation errors, proceed with the rest of the function
 try {
  const scrapedData = await scrapeWebsite(formData);
  zipFile(formData);

  res.status(200).send({ message: 'You can now download' });
  return;
 } catch (err) {
  res.status(400).json({ message: err.message });
 }
}
*/
export { getUrl };
