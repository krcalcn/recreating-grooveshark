const BaseDatabase = require('./base-database');
const Artist = require('../models/artist');

class ArtistDatabase extends BaseDatabase {

}

module.exports = new ArtistDatabase(Artist);
