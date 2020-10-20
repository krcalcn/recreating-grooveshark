const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  creatorUserId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    autopopulate: { maxDepth: 1 },
  },
  trackId: {
    type: mongoose.Types.ObjectId,
  },
  name: String,
  duration: Number,
  releaseDate: Date,
  artists: [{
    type: mongoose.Types.ObjectId,
    ref: 'Artist',
    autopopulate: true,
  }],
  genres: [{
    type: mongoose.Types.ObjectId,
    ref: 'Genre',
    autopopulate: true,
  }],
  recordCompany: String,
  listener: Number,
}, { timestamps: true });

SongSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Song', SongSchema);
