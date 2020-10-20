const BaseService = require('./base-service');
const Song = require('../models/song');

class SongService extends BaseService {
}

module.exports = new SongService(Song);
