const router = require('express').Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { Readable } = require('stream');
const db = require('../mongo-connection');
const songService = require('../services/song-service');

router.get('/:songId', async (req, res) => {
  const song = await songService.find(req.params.songId);
  res.send(song);
});

router.get('/track/:trackId', async (req, res) => {
  const trackId = new mongoose.mongo.ObjectID(req.params.trackId);
  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');

  const bucket = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: 'tracks',
  });

  const downloadStream = bucket.openDownloadStream(trackId);

  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });

  downloadStream.on('error', () => {
    console.log('error');
    res.sendStatus(404);
  });

  downloadStream.on('end', () => {
    res.end();
  });
});

router.post('/:userId/song', async (req, res) => {
  const { userId } = req.params;
  const storage = multer.memoryStorage();
  const upload = multer({
    storage,
    limits: {
      fields: 9, fileSize: 6000000, files: 9, parts: 9,
    },
  });

  upload.single('track')(req, res, (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: err });
      } if (!req.body.name) {
        return res.status(400).json({ message: 'No track name in request body' });
      }

      const readableTrackStream = new Readable();
      readableTrackStream.push(req.file.buffer);
      readableTrackStream.push(null);

      const bucket = new mongoose.mongo.GridFSBucket(db.db, {
        bucketName: 'tracks',
      });

      const {
        name, duration, releaseDate, artists, genres, recordCompany, listener,
      } = req.body;

      const uploadStream = bucket.openUploadStream(req.body.name);
      const { id } = uploadStream;
      readableTrackStream.pipe(uploadStream);

      uploadStream.on('error', () => res.status(500).json({ message: 'Error uploading file' }));

      uploadStream.on('finish', async () => {
        await songService.addSong(
          userId,
          new mongoose.mongo.ObjectID(id),
          name,
          duration,
          releaseDate,
          artists,
          genres,
          recordCompany,
        );
        res.status(201).json({ message: `File uploaded successfully, stored under Mongo ObjectID: ${id}` });
      });
    } catch (e) {
      console.log(e);
    }
  });
});

module.exports = router;
