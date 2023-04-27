import scrape from 'website-scraper'; // only as ESM, no CommonJS
import SaveToExistingDirectoryPlugin from 'website-scraper-existing-directory';

async function scrapeWebsite(webflowUrl) {
 const options = {
  urls: [webflowUrl, 'https://uploads-ssl.webflow.com'],
  urlFilter: function (url) {
   return url.indexOf(webflowUrl) === 0 || url.indexOf('https://uploads-ssl.webflow.com') === 0;
  },
  directory: 'G:/JavascriptProjects/Webflow-export/server/website-files',
  plugins: [new SaveToExistingDirectoryPlugin()],
  recursive: true,
  maxRecursiveDepth: 5,
 };

 // with async/await
 const result = await scrape(options);
}

export { scrapeWebsite };
