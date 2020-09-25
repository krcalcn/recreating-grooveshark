const uuid = require('uuid');

class Artist {
  constructor(name, genres = [], id = uuid.v4(), albums = [],
    singles = [], createdAt = new Date(), deletedAt = null) {
    this.name = name;
    this.genres = genres;
    this.id = id;
    this.albums = albums;
    this.singles = singles;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }

  static create({
    name, genres, id, albums, singles, createdAt, deletedAt,
  }) {
    return new Artist(name, genres, id, albums, singles, createdAt, deletedAt);
  }
}

module.exports = Artist;
