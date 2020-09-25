const uuid = require('uuid');

class Song {
  constructor(
    name,
    duration,
    url,
    releaseDate,
    creatorUserId,
    id = uuid.v4(),
    artists = [],
    genres = [],
    recordCompany = null,
    listener = 0,
    createdAt = new Date(),
    deletedAt = null,
  ) {
    this.name = name;
    this.duration = duration;
    this.url = url;
    this.releaseDate = releaseDate;
    this.creatorUserId = creatorUserId;
    this.id = id;
    this.artists = artists;
    this.genres = genres;
    this.recordCompany = recordCompany;
    this.listener = listener;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }

  static create({
    name,
    duration,
    url,
    releaseDate,
    creatorUserId,
    id,
    artists,
    genres,
    recordCompany,
    listener,
    createdAt,
    deletedAt,
  }) {
    return new Song(
      name,
      duration,
      url,
      releaseDate,
      creatorUserId,
      id,
      artists,
      genres,
      recordCompany,
      listener,
      createdAt,
      deletedAt,
    );
  }
}

module.exports = Song;
