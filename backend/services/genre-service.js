const BaseService = require('./base-service');
const Genre = require('../models/genre');

class GenreService extends BaseService {
}

module.exports = new GenreService(Genre);
