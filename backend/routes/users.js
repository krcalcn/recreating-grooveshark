const router = require('express').Router();
const { userService, listService } = require('../services');

// router.get('/', async (req, res) => {
//   const users = await userService.load();
//   res.render('users', { users });
// });

router.post('/', async (req, res) => {
  const user = await userService.createUser(req.body);

  res.send(user);
});

router.delete('/:userId', async (req, res) => {
  await userService.removeBy('_id', req.params.userId);

  res.send('ok');
});

router.get('/:userId', async (req, res) => {
  const user = await userService.find(req.params.userId);
  if (!user) return res.status(d).send('Cannot find user');

  res.send(user);
});

router.post('/login', async (req, res) => {
  const { usernameOrMail, password } = req.body;
  const resp = await userService.login(usernameOrMail, password);
  res.send(resp);
});

// router.patch('/:userId', async (req, res) => {
//   const { userId } = req.params;
//   const { userName } = req.body;

//   await userService.update(userId, { userName });
// });

router.post('/:userId/lists', async (req, res) => {
  const { userId } = req.params;
  const { name, isPublic } = req.body;

  const list = await listService.createList(userId, name, isPublic);
  res.send('ok');
  // res.render('lists', { lists });
});

router.post('/:userId/broadcast', async (req, res) => {
  const { userId } = req.params;
  const { name, isActive, isPublic } = req.body;
  const bc = await userService.createBroadcast(userId, name, isActive, isPublic);

  res.send('ok');
});

router.post('/:userId/lists/:listId', async (req, res) => {
  const { userId, listId } = req.params;
  const { songs } = req.body;

  await listService.addToList(userId, listId, songs);

  res.send('ok');
});

router.post('/:userId/saveSong/:songId', async (req, res) => {
  const { userId, songId } = req.params;
  await userService.saveSong(userId, songId);
  res.send('ok');
});

module.exports = router;
