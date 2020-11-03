const router = require('express').Router();
const { artistService } = require('../services');

router.get('/', async (req, res) => {
  const artists = await artistService.load();
  res.send(artists);
});

router.get('/:artistId', async (req, res) => {
  const artist = await artistService.find(req.params.artistId);
  if (!artist) return res.status(404).send('Cannot find artist');
  res.send(artist);
});
router.post('/:userId/artist', async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  await artistService.createArtist(userId, name);

  res.send('ok');
});

module.exports = router;
