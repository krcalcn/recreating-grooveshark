const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/grooveshark', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we are connected to mongodb!');
});

module.exports = db;
