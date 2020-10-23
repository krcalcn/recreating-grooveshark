const BaseService = require('./base-service');
const Artist = require('../models/artist');

class ArtistService extends BaseService {

}

module.exports = new ArtistService(Artist);
