import express from 'express';

const router = express.Router();

router.get('/:filepath', (req, res) => {
 const file = req.params.filepath;
 res.download(file);
});

export default router;

