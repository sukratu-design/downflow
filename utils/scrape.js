import path from 'path';
import { fileURLToPath } from 'url';
import scrape from 'website-scraper'; // only as ESM, no CommonJS
import Url from 'url-parse';
import SaveToExistingDirectoryPlugin from 'website-scraper-existing-directory';
import { removeBadge, badgeTexts } from '../utils/removeBadge.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const downloadDirectory = path.join(__dirname, '../Download');

async function scrapeWebsite(formData) {
 const { websiteUrl, depth } = formData;
 const parsedUrl = new Url(websiteUrl);

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
  directory: `${downloadDirectory}/${parsedUrl.host}`,
  plugins: [new SaveToExistingDirectoryPlugin()],
  recursive: true,
  maxRecursiveDepth: depth,
 };

 const result = await scrape(options);
 if (isWebflowSite(websiteUrl)) {
  await removeBadge(downloadDirectory, badgeTexts);
 }
}

function isWebflowSite(url) {
 const website = 'webflow.io';
 return url.includes(website);
}

export { scrapeWebsite };
