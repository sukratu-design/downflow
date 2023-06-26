import scrape from 'website-scraper';
import eventEmitter from '../utils/eventEmitter.js';

import { CreateZipFilePlugin, archive } from '../utils/CreateZipFilePlugin.js';

let counter = 0;
class ConsoleLogPlugin {
 constructor(eventEmitter) {
  this.eventEmitter = eventEmitter;
 }
 apply(registerAction) {
  registerAction('onResourceSaved', ({ resource }) => {
   counter++;
   const message = `${counter} ${resource.filename} downloaded successfully!`;
   this.eventEmitter.emit('progress', message);
   //console.log(message);
  });
  counter = 0;
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
  plugins: [new ConsoleLogPlugin(eventEmitter), new CreateZipFilePlugin(websiteUrl)],
  recursive: true,
  maxRecursiveDepth: depth,
 };
 eventEmitter.emit('progress', 'Test progress message');

 const result = await scrape(options);
 return archive;
}

function isWebflowSite(url) {
 const website = 'webflow.io';
 return url.includes(website);
}

export { scrapeWebsite };
