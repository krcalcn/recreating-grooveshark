const uuid = require('uuid');

class Album {
  constructor(name, songs, releaseDate, genres, recordCompany = '') {
    this.id = uuid.v4();
    this.name = name;
    this.songs = songs;
    this.releaseDate = releaseDate;
    this.genres = genres;
    this.recordCompany = recordCompany;
    this.createdAt = new Date();
    this.deletedAt = null;
  }

  deleteAlbum() {
    this.deletedAt = new Date();
  }
}

module.exports = Album;
