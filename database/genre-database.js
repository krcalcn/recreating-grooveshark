const BaseDatabase = require('./base-database');
const Genre = require('../models/genre');

class GenreDatabase extends BaseDatabase {
}

module.exports = new GenreDatabase(Genre);
