const BaseDatabase = require('./base-database');
const Song = require('../models/song');

class SongDatabase extends BaseDatabase {
}

module.exports = new SongDatabase(Song);
