const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { maxDepth: 1 },
  },
  name: String,
  isPublic: Boolean,
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
    autopopulate: { maxDepth: 1 },
  }],
  whoCanSee: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { maxDepth: 1 },
  },
  ],
  whoCanAdd: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { maxDepth: 1 },
  }],
}, { timestamps: true });

ListSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('List', ListSchema);
