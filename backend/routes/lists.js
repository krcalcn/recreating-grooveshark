const router = require('express').Router();
const flatted = require('flatted');
const { listService } = require('../services');

router.get('/', async (req, res) => {
  let lists = await listService.load();
  lists = lists.filter((list) => list.isPublic == true);
  res.render('lists', { lists });
});

router.get('/:listId', async (req, res) => {
  const list = await listService.find(req.params.listId);
  if (!list) return res.status(404).send('Cannot find list');
  res.render('list', { list });
});

module.exports = router;