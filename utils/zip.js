import { zip } from 'zip-a-folder';
import { promises as fs } from 'fs';


     async function zipFile() {
        const dest = 'G:/JavascriptProjects/Webflow-export/server/website-files-zipped/website.zip';
        try {
            const stat = await fs.stat(dest);
            if (stat.isFile()) {
                await fs.unlink(dest);
            }
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }
        await zip('G:/JavascriptProjects/Webflow-export/server/website-files', dest);
    }


export {zipFile}
