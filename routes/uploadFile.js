import express from 'express';
import { Storage } from '@google-cloud/storage';
import axios from 'axios';

const projectId = 'website-downloader-387015';
const keyFilename = 'G:/JavascriptProjects/Website-downloader-WebApp/config/mykey.json';
const bucketName = 'download_directory';

const storage = new Storage({ projectId, keyFilename });

async function scrapeAndUploadToGCS(url, destinationFileName) {
 try {
  const response = await axios.get(url);
  const fileContent = response.data;

  const bucket = storage.bucket(bucketName);
  const file = bucket.file(destinationFileName);

  await file.save(fileContent, {
   metadata: {
    contentType: 'text/html', // Modify the content type as per the webpage's content
   },
  });

  console.log(`Scraped data saved to ${destinationFileName} in Google Cloud Storage.`);
 } catch (error) {
  console.error('Error scraping and uploading to Google Cloud Storage:', error);
  throw error;
 }
}

const router = express.Router();

router.get('/', async (req, res) => {
 const url = 'https://beltorion.com/'; // Modify the URL as per your requirements
 const destinationFileName = 'test/beltorion.html'; // Modify the destination file name

 try {
  await scrapeAndUploadToGCS(url, destinationFileName);
  res.send('Scraped data uploaded successfully.');
 } catch (error) {
  console.error(error);
  res.status(500).send('Error uploading scraped data.');
 }
});

export default router;
