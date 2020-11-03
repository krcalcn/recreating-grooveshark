const BaseService = require('./base-service');
const Genre = require('../models/genre');
const userService = require('./user-service');

class GenreService extends BaseService {
  async createGenre(userId, name) {
    const user = await userService.find(userId);
    let genre;
    if (user) {
      genre = await this.insert({ name });
    } else {
      throw new Error('Invalid User!');
    }
    return genre;
  }
}

module.exports = new GenreService(Genre);
