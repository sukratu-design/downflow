import { v4 as uuidv4 } from 'uuid';
import { scrapeWebsite } from '../utils/scrape.js';
import Url from 'url-parse';

let downloadedData;

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
  downloadedData = await scrapeWebsite(formData);
  const fileName = `${websiteUrlHost}.zip`;

  res.status(200).json({ message: 'You can now download', fileName });
 } catch (err) {
  res.status(400).json({ message: err.message });
 }
}
export { getUrl, downloadedData };
