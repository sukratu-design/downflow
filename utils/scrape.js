import scrape from 'website-scraper';
import { CreateZipFilePlugin, archive } from '../utils/CreateZipFilePlugin.js';

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

async function scrapeWebsite(formData) {
 const { websiteUrl, depth } = formData;
 const userDirectory = 'download_directory';

 const options = {
  urls: [websiteUrl, 'https://uploads-ssl.webflow.com'],
  urlFilter: function (url) {
   // Include all URLs that match the website URL or have a specific file extension
   return (
    url.indexOf(websiteUrl) === 0 ||
    url.endsWith('.js') ||
    url.endsWith('.css') ||
    url.endsWith('.jpg') ||
    url.endsWith('.png') ||
    url.endsWith('.svg') ||
    url.endsWith('.pdf') ||
    url.startsWith('https://uploads-ssl.webflow.com')
   );
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
  plugins: [new ConsoleLogPlugin(), new CreateZipFilePlugin()],
  recursive: true,
  maxRecursiveDepth: depth,
 };

 const result = await scrape(options);
 return archive;
}

function isWebflowSite(url) {
 const website = 'webflow.io';
 return url.includes(website);
}

export { scrapeWebsite };
