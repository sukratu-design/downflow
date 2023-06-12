import scrape from 'website-scraper';
import CreateZipFilePlugin from '../utils/CreateZipFilePlugin.js';

//import { removeBadge, badgeTexts } from '../utils/removeBadge.js';
import path from 'path';
import paths from './paths.js';
import logger from '../utils/logger.js';
import fs from 'fs-extra';

const { downloadDirectory } = paths;

class ConsoleLogPlugin {
 apply(registerAction) {
  registerAction('onResourceSaved', ({ resource }) =>
   console.log(`${resource} downloaded successfully!`)
  );
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
 console.log('result');

 // Log the files that were scraped
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

export { scrapeWebsite };
