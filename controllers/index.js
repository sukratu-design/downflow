import { scrapeWebsite } from '../utils/scrape.js';
import { zipFile } from '../utils/zip.js';

async function getUrl(req, res) {
 const formData = req.body;
 //console.log(formData);

 try {
  const scrapedData = await scrapeWebsite(formData);
  zipFile();

  res.status(200).send({ message: 'You can now download' });
  return;
 } catch (err) {
  res.status(400).json({ message: err.message });
 }
}
export { getUrl };
