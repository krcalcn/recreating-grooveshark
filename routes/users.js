const router = require('express').Router();
const flatted = require('flatted');
const { userDatabase, listDatabase } = require('../database');

router.get('/', async (req, res) => {
  const users = await userDatabase.load();
  // res.send(flatted.stringify(users));
  res.render('users', { users });
});

router.post('/', async (req, res) => {
  const user = await userDatabase.insert(req.body);

  res.send(user);
});

router.delete('/:userId', async (req, res) => {
  await userDatabase.removeBy('id', req.params.userId);

  res.send('ok');
});

router.get('/:userId', async (req, res) => {
  const user = await userDatabase.find(req.params.userId);
  if (!user) return res.status(404).send('Cannot find user');
  res.render('user', { user });
});

router.post('/:userId/lists', async (req, res) => {
  const { userId } = req.params;
  const { name, isPublic } = req.body;

  const user = await userDatabase.find(req.params.userId);
  const list = user.createList(user.id, name, isPublic);
  listDatabase.insert(list);
  userDatabase.update(user);

  res.send('ok');
  // res.render('lists', { lists });
});
module.exports = router;
