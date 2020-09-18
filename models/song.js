const uuid = require('uuid');

class Song {
  constructor(
    name,
    duration,
    url,
    releaseDate,
    creatorUserId,
    artists = [],
    genres = [],
    recordCompany = null,
  ) {
    this.id = uuid.v4();
    this.name = name;
    this.duration = duration;
    this.url = url;
    this.releaseDate = releaseDate;
    this.genres = genres;
    this.listener = 0;
    this.recordCompany = recordCompany;
    this.artists = artists;
    this.creatorUserId = creatorUserId;
    this.createdAt = new Date();
    this.deletedAt = null;
  }

  deletesong() {
    this.deletedAt = new Date();
  }
}

module.exports = Song;
