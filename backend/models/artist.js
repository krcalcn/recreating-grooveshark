const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
  name: String,
  genres: [{
    type: mongoose.Types.ObjectId,
    ref: 'Genre',
    autopopulate: { maxDepth: 1 },
  }],
  albums: [{
    type: mongoose.Types.ObjectId,
    ref: 'Album',
    autopopulate: { maxDepth: 1 },
  }],
  singles: [{
    type: mongoose.Types.ObjectId,
    ref: 'Song',
    autopopulate: { maxDepth: 1 },
  }],
}, { timestamps: true });

ArtistSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Artist', ArtistSchema);
