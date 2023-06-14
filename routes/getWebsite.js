import express from 'express';
import { getUrl } from '../controllers/getWebsite.js';

const router = express.Router();

router.post('/', getUrl);

export default router;
