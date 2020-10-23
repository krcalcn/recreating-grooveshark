const mongoose = require('mongoose');

const BroadcastSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  },
  name: String,
  isActive: Boolean,
  isPublic: Boolean,
  queue: [{
    type: mongoose.Types.ObjectId,
    ref: 'Song',
    autopopulate: true,
  }],
  whoCanJoin: [{
    type: mongoose.Types.ObjectId,
    ref: 'User',
  }],
  chat: [],
}, { timestamps: true });

BroadcastSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Broadcast', BroadcastSchema);
