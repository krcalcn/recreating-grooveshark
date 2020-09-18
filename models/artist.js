const uuid = require('uuid');

class Artist {
  constructor(name, genres) {
    this.id = uuid.v4();
    this.name = name;
    this.albums = [];
    this.singles = [];
    this.genres = [];
    this.createdAt = new Date();
    this.deletedAt = null;
  }
}

module.exports = Artist;
