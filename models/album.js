const uid = require('uid');
const moment = require('moment');

class Album {
  constructor(name, songs, releaseDate, genres, recordCompany = '') {
    this.id = uid();
    this.name = name;
    this.songs = songs;
    this.releaseDate = releaseDate;
    this.genres = genres;
    this.recordCompany = recordCompany;
    this.createdAt = moment().format();
    this.deletedAt = '';
  }
}

module.exports = Album;
