const BaseDatabase = require('./base-database');
const Album = require('../models/album');

class AlbumDatabase extends BaseDatabase {
}

module.exports = new AlbumDatabase(Album);
