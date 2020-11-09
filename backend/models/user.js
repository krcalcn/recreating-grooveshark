const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  userName: {
    type: String,
    required: [true, 'The Username field is required!'],
    trim: true,
    unique: 1,
  },
  email: {
    type: String,
    required: [true, 'The email field is required!'],
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: [true, 'The password field is required!'],
    minlength: 5,
  },
  addedSongs: [{
    type: mongoose.Types.ObjectId,
    ref: 'Song',
    autopopulate: { maxDepth: 1 },
  }],
  savedSongs: [{
    type: mongoose.Types.ObjectId,
    ref: 'Song',
    autopopulate: { maxDepth: 1 },
  }],
  savedLists: [{
    type: mongoose.Types.ObjectId,
    ref: 'List',
    autopopulate: { maxDepth: 1 },
  }],
  favoriteSongs: [{
    type: mongoose.Types.ObjectId,
    ref: 'Song',
    autopopulate: { maxDepth: 1 },
  }],
  favoriteLists: [{
    type: mongoose.Types.ObjectId,
    ref: 'List',
    autopopulate: { maxDepth: 1 },
  }],
  following: [{
    type: mongoose.Types.ObjectId,
    ref: 'User',
    autopopulate: { maxDepth: 1 },
  }],
  broadcast: {
    type: mongoose.Types.ObjectId,
    ref: 'Broadcast',
    autopopulate: { maxDepth: 1 },
    default: null,
  },
  attendedBroadcast: {
    type: mongoose.Types.ObjectId,
    ref: 'Broadcast',
    autopopulate: { maxDepth: 1 },
    default: null,
  },
}, { timestamps: true });

UserSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('User', UserSchema);
