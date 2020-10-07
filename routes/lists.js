const router = require('express').Router();
const flatted = require('flatted');
const { listDatabase } = require('../database');

router.get('/', async (req, res) => {
  let lists = await listDatabase.load();
  lists = lists.filter((list) => list.isPublic == true);
  res.render('lists', { lists });
});

router.get('/:listId', async (req, res) => {
  const list = await listDatabase.find(req.params.listId);
  if (!list) return res.status(404).send('Cannot find list');
  res.render('list', { list });
});

module.exports = router;
