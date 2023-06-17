const badgeTexts = [
 new RegExp(
       'if\\s*\\(\\s*shouldBrand\\s*&&\\s*!\\s*isPhantom\\s*\\)\\s*{\\s*brandElement\\s*=\\s*brandElement\\s*\\|\\|\\s*createBadge\\(\\);\\s*ensureBrand\\(\\);\\s*setTimeout\\(ensureBrand,\\s*500\\);\\s*\\$\\(doc\\)\\.off\\(fullScreenEvents,\\s*onFullScreenChange\\)\\.on\\(fullScreenEvents,\\s*onFullScreenChange\\);\\s*}',
       'gm'
       ), // prettier-ignore
 new RegExp('\\.w-webflow-badge', 'g'), // prettier-ignore
 new RegExp('function createBadge\(\)\s*{\s*(?:\/\/.*\r?\n)*\s*[^}]+}', 'g'), // prettier-ignore
 'c.hostname !== p && (u = !0)',
 'shouldBrand = true',
];

async function removeBadge(fileContent, badgeTexts) {
 let modifiedData = fileContent;

 // remove each text from the array
 badgeTexts.forEach((text, index) => {
  if (index === 3) {
   modifiedData = modifiedData.replace(text, 'c.hostname !== p && (u = 0)');
  }
  if (index === 4) {
   modifiedData = modifiedData.replace(text, 'shouldBrand = false');
  }
  modifiedData = modifiedData.replace(text, '');
  console.log('badge removed');
 });

 return modifiedData;
}

export { removeBadge, badgeTexts };
