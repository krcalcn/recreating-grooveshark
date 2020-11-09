const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://mongodb:27017/grooveshark';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we are connected to mongodb!');
});

module.exports = db;
