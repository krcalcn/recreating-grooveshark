const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  //
}, { timestamps: true });

TrackSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Track', TrackSchema);
