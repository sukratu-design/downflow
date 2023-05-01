import express from 'express';

const router = express.Router();

router.get('/', message);

async function message(req, res) {
 console.log('message');
 res.status(200).send({
  message: 'hello worlds',
 });
}

export default router;
