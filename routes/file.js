import express from 'express';
import router from 'express';

import { getFile } from '../controllers/uploadFile.js';

router('/').post(getFile)

export default router;