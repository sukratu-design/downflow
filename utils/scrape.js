import scrape from 'website-scraper';
import SaveResourceToGoogleCloudStoragePlugin from '../utils/SaveResourceToGoogleCloudStoragePlugin.js';
import CreateZipFilePlugin from '../utils/CreateZipFilePlugin.js';

import { removeBadge, badgeTexts } from '../utils/removeBadge.js';
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

class SaveResourceToFileSystemPlugin {
 apply(registerAction) {
  let absoluteDirectoryPath,
   loadedResources = [];

  registerAction('beforeStart', ({ options }) => {
   if (!options.directory || typeof options.directory !== 'string') {
    throw new Error(`Incorrect directory ${options.directory}`);
   }

   absoluteDirectoryPath = path.resolve(process.cwd(), options.directory);
   console.log(absoluteDirectoryPath);

   if (fs.existsSync(absoluteDirectoryPath)) {
    throw new Error(`Directory ${absoluteDirectoryPath} exists`);
   }
  });

  registerAction('saveResource', async ({ resource }) => {
   const filename = path.join(absoluteDirectoryPath, resource.getFilename());
   const text = resource.getText();
   const encoding = resource.getEncoding();
   console.log(encoding);
   await fs.outputFile(filename, text, { encoding: resource.getEncoding() });
   loadedResources.push(resource);
  });

  registerAction('error', async () => {
   if (loadedResources.length > 0) {
    await fs.remove(absoluteDirectoryPath);
   }
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
