import { v4 as uuidv4 } from 'uuid';
import { scrapeWebsite } from '../utils/scrape.js';
import Url from 'url-parse';
import { createReadStream } from 'fs';
import fs from 'fs';
import { Readable } from 'stream';

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
  const readStream = await scrapeWebsite(formData, directoryId, websiteUrlHost);
  const fileName = `${websiteUrlHost}.zip`;
  savingLocaly(fileName, readStream);
  console.log(fileName);
  //sendZipFileToClient(res, fileName);
  res.status(200).json({ message: 'You can now download', fileName });
 } catch (err) {
  res.status(400).json({ message: err.message });
 }
}

//savingLocaly('zipFilename.zip', archive);
function savingLocaly(zipFilename, archive) {
 const outputStream = fs.createWriteStream(zipFilename);
 archive.pipe(outputStream);

 // Event handler for when the archive finishes writing
 outputStream.on('close', () => {
  console.log(`Scraped data saved to ${zipFilename}.`);
 });

 // Event handler for any errors during writing
 outputStream.on('error', (err) => {
  console.error('Error saving the archive:', err);
 });
}

function sendZipFileToClient(res, fileName) {
 const fileStream = fs.createReadStream(fileName);
 fileStream.pipe(res);

 res.on('finish', () => {
  console.log(`ZIP file ${fileName} sent to the client.`);
 });

 res.on('error', (err) => {
  console.error('Error sending the ZIP file:', err);
  res.status(500).json({ message: 'Failed to send the ZIP file' });
 });
}

export { getUrl };
