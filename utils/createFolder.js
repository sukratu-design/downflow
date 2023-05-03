import fs from 'fs';
import path from 'path';
import paths from './paths.js';
const { downloadDirectory } = paths;

async function createNewFolder() {
  const dirPath = `${downloadDirectory}/${moment().format('YYYY-MM-DD-HH-mm-ss')}`;
  try {
    await mkdir(dirPath);
    console.log(`New folder created: ${dirPath}`);
    return dirPath;
  } catch (err) {
    console.error(`Error creating folder: ${dirPath}`, err);
    throw err;
  }
}

export { createNewFolder };
