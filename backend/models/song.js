const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  creatorUserId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    autopopulate: false,
  },
  trackId: {
    type: mongoose.Types.ObjectId,
    autopopulate: false,
  },
  name: String,
  duration: Number,
  releaseDate: Date,
  artists: [{
    type: mongoose.Types.ObjectId,
    ref: 'Artist',
    autopopulate: { maxDepth: 1 },
  }],
  genres: [{
    type: mongoose.Types.ObjectId,
    ref: 'Genre',
    autopopulate: { maxDepth: 1 },
  }],
  recordCompany: String,
  listener: Number,
}, { timestamps: true });

SongSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Song', SongSchema);
