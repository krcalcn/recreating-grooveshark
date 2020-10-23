const BaseService = require('./base-service');
const Album = require('../models/album');

class AlbumService extends BaseService {
}

module.exports = new AlbumService(Album);
