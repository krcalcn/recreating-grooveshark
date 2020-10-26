const router = require('express').Router();
const { userService, listService } = require('../services');

router.get('/', async (req, res) => {
  const users = await userService.load();
  res.render('users', { users });
});

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

  res.render('user', { user });
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
  // res.render('lists', { lists });
});

router.post('/:userId/saveSong/:songId', async (req, res) => {
  const { userId, songId } = req.params;
  await userService.saveSong(userId, songId);
  res.send('ok');
});

router.post('/:userId/artist', async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const list = await userService.createArtist(userId, name);

  res.send('ok');
});

router.post('/:userId/genre', async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const list = await userService.createGenre(userId, name);

  res.send('ok');
});

module.exports = router;

// router.get('/track/:trackID', async (req, res) => {
//   const trackID = new mongoose.mongo.ObjectID(req.params.trackID);
//   res.set('content-type', 'audio/mp3');
//   res.set('accept-ranges', 'bytes');

//   const song = await songService.findBy('trackId', trackID);

//   const bucket = new mongoose.mongo.GridFSBucket(db.db, {
//     bucketName: 'tracks',
//   });

//   const downloadStream = bucket.openDownloadStream(trackID);

//   downloadStream.on('data', (chunk) => {
//     res.write(chunk);
//   });

//   downloadStream.on('error', () => {
//     console.log('error');
//     res.sendStatus(404);
//   });

//   downloadStream.on('end', () => {
//     res.end();
//   });
// });

// router.post('/:userId/song', async (req, res) => {
//   const { userId } = req.params;
//   const storage = multer.memoryStorage();
//   const upload = multer({
//     storage,
//     limits: {
//       fields: 9, fileSize: 6000000, files: 9, parts: 9,
//     },
//   });

//   upload.single('track')(req, res, (err) => {
//     try {
//       if (err) {
//         return res.status(400).json({ message: err });
//       } if (!req.body.name) {
//         return res.status(400).json({ message: 'No track name in request body' });
//       }

//       const readableTrackStream = new Readable();
//       readableTrackStream.push(req.file.buffer);
//       readableTrackStream.push(null);

//       const bucket = new mongoose.mongo.GridFSBucket(db.db, {
//         bucketName: 'tracks',
//       });

//       const {
//         name, duration, releaseDate, artists, genres, recordCompany, listener,
//       } = req.body;

//       const uploadStream = bucket.openUploadStream(req.body.name);
//       const { id } = uploadStream;
//       readableTrackStream.pipe(uploadStream);

//       uploadStream.on('error', () => res.status(500).json({ message: 'Error uploading file' }));

//       uploadStream.on('finish', async () => {
//         await songService.addSong(
//           userId,
//           new mongoose.mongo.ObjectID(id),
//           name,
//           duration,
//           releaseDate,
//           artists,
//           genres,
//           recordCompany,
//         );
//       res.status(201).json({
//       message: `File uploaded successfully,
//        stored under Mongo ObjectID: ${id}`,
//       });
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   });
// });
