import scrape from 'website-scraper';
import { CreateZipFilePlugin, archive } from '../utils/CreateZipFilePlugin.js';

//import { removeBadge, badgeTexts } from '../utils/removeBadge.js';
import path from 'path';
import paths from './paths.js';
import logger from '../utils/logger.js';
import fs from 'fs-extra';

const { downloadDirectory } = paths;

let counter = 0;
class ConsoleLogPlugin {
 apply(registerAction) {
  registerAction('onResourceSaved', ({ resource }) => {
   counter++;
   console.log(`${counter} ${resource.filename} downloaded successfully! `);
  });
 }
}

async function scrapeWebsite(formData, directoryId, websiteUrlHost) {
 const { websiteUrl, depth } = formData;
 //const userDirectory = `${downloadDirectory}/${directoryId}/${websiteUrlHost}`;
 const userDirectory = 'download_directory';

 const options = {
  urls: [websiteUrl, 'https://uploads-ssl.webflow.com'],
  urlFilter: function (url) {
   return url.indexOf(websiteUrl) === 0 || url.indexOf('https://uploads-ssl.webflow.com') === 0;
  },

  subdirectories: [
   { directory: 'img', extensions: ['.jpg', '.png', '.svg', '.jpeg', '.webp', '.gif'] },
   { directory: 'js', extensions: ['.js'] },
   { directory: 'css', extensions: ['.css'] },
   { directory: 'fonts', extensions: ['.ttf', '.otf', '.woff', '.woff2', '.eot'] },
   {
    directory: 'media',
    extensions: ['.avi', '.mp4', '.wmv', '.flv', '.mkv', '.swf', '.f4v', '.mov'],
   },
  ],

  directory: userDirectory,
  //directory: 'download_directory',

  plugins: [new ConsoleLogPlugin(), new CreateZipFilePlugin()],
  recursive: true,
  maxRecursiveDepth: depth,
 };

 const result = await scrape(options);
 return archive;
 /*
 if (isWebflowSite(websiteUrl)) {
  await removeBadge(userDirectory, badgeTexts);  
 }
*/
}

function isWebflowSite(url) {
 const website = 'webflow.io';
 return url.includes(website);
}

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

export { scrapeWebsite };
