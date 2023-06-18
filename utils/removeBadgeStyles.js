function removeBadgeStyles(cssContent) {
 const selectorsToReplace = [
  '.w-webflow-badge',
  '.w-webflow-badge *',
  '.w-webflow-badge',
  '.w-webflow-badge > img',
 ];

 const modifiedCssContent = selectorsToReplace.reduce((content, selector) => {
  const regexSelector = new RegExp(escapeRegex(selector) + '\\s*{[^}]+}', 'g');
  const replacement = `${selector} { display: none; }`;
  return content.replace(regexSelector, replacement);
 }, cssContent);

 return modifiedCssContent;
}

function escapeRegex(string) {
 return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default removeBadgeStyles;
