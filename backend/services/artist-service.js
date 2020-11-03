const BaseService = require('./base-service');
const Artist = require('../models/artist');
const userService = require('./user-service');

class ArtistService extends BaseService {
  async createArtist(userId, name) {
    const user = await userService.find(userId);
    let artist;
    if (user) {
      artist = await this.insert({ name });
    } else {
      return new Error('Invalid User!');
    }
    return artist;
  }
}

module.exports = new ArtistService(Artist);
