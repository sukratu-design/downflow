import express from 'express';
import { getUrl } from '../controllers/index.js';

const router = express.Router();

router.post('/', getUrl);

export default router;
