const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  userName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: String,
  queue: [],
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

// class User {
//   constructor(
//     id = uuid.v4(),
//     name,
//     userName,
//     email,
//     password,
//     queue = [],
//     ownedLists = [],
//     addedSongs = [],
//     savedSongs = [],
//     savedLists = [],
//     favoriteSongs = [],
//     favoriteLists = [],
//     following = [],
//     broadcast = null,
//     attendedBroadcast = null,
//     createdAt = new Date(),
//     deletedAt = null,
//   )

//   createBroadcast(name, isActive, isPublic, queue) {
//     const bc = new Broadcast(this.id, name, isActive, isPublic, queue);
//     this.broadcast = bc;
//     this.startBroadcasting(bc);
//     return bc;
//   }

//   startBroadcasting(broadcast) {
//     broadcast.isActive = true;
//     this.broadcast = broadcast;
//     this.attendToBroadcast(broadcast);
//   }

//   attendToBroadcast(broadcast) {
//     this.attendedBroadcast = broadcast;
//     this.queue = broadcast.queue;
//   }

//   joinBroadCast(broadcast) {
//     this.attendedBroadcast = broadcast.id;
//   }

//   freezeUser() {
//     this.deletedAt = new Date();
//   }
