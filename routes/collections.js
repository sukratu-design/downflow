import router from 'express';

import { getCollections } from '../controllers/collections.js';

const collectionsRouter = router();

collectionsRouter.get('/', async (req, res, next) => {
  try {
    const collections = await getCollections();
    res.status(200).send(collections);
  } catch (error) {
    next(error);
  }
});
//collectionsRouter.get('/:id', getCollection);

export default collectionsRouter;