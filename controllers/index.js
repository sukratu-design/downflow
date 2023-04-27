import { scrapeWebsite } from '../utils/scrape.js';
import { zipFile } from '../utils/zip.js';


async function getUrl(req, res) {
 const text = req.body;
 console.log(text);

 try {
  const scrapedData = await scrapeWebsite(text.url);
  zipFile();

  res.status(200).send({message: "You can now download"});
  return;
 } catch (err) {
  res.status(400).json({ message: err.message });
 }
}
export { getUrl };
