import scrape from 'website-scraper'; // only as ESM, no CommonJS
import SaveToExistingDirectoryPlugin from 'website-scraper-existing-directory';

async function scrapeWebsite(formData) {
 const { websiteUrl, depth } = formData;
 console.log(websiteUrl, depth);
 const options = {
  urls: [websiteUrl, 'https://uploads-ssl.webflow.com'],
  urlFilter: function (url) {
   return url.indexOf(websiteUrl) === 0 || url.indexOf('https://uploads-ssl.webflow.com') === 0;
  },
  directory: 'G:/JavascriptProjects/Donloaded Website',
  plugins: [new SaveToExistingDirectoryPlugin()],
  recursive: true,
  maxRecursiveDepth: depth,
 };

 // with async/await
 const result = await scrape(options);
}

export { scrapeWebsite };
