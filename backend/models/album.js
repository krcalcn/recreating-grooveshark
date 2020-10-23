const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  name: String,
  songs: [{
    type: mongoose.Types.ObjectId,
    ref: 'Song',
    autopopulate: { maxDepth: 1 },
  }],
  genres: [{
    type: mongoose.Types.ObjectId,
    ref: 'Genre',
    autopopulate: { maxDepth: 1 },
  }],
  releaseDate: Date,
  recordCompany: String,
}, { timestamps: true });

AlbumSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Album', AlbumSchema);
