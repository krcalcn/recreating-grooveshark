const uuid = require('uuid');

class Album {
  constructor(name, songs, releaseDate, genres = [], recordCompany = null,
    id = uuid.v4(), createdAt = new Date(), deletedAt = null) {
    this.name = name;
    this.songs = songs;
    this.releaseDate = releaseDate;
    this.genres = genres;
    this.recordCompany = recordCompany;
    this.id = id;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }

  static create({
    name, songs, releaseDate, genres, recordCompany, id, createdAt, deletedAt,
  }) {
    return new Album(name, songs, releaseDate, genres, recordCompany, id, createdAt, deletedAt);
  }
}

module.exports = Album;
