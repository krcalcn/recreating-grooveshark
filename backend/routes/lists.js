const router = require('express').Router();
const { listService } = require('../services');

router.get('/', async (req, res) => {
  let lists = await listService.load();
  lists = lists.filter((list) => list.isPublic == true);
  res.send(lists);
});

router.get('/:listId', async (req, res) => {
  const list = await listService.find(req.params.listId);
  if (!list) return res.status(404).send('Cannot find list');
  res.send(list);
});

module.exports = router;
