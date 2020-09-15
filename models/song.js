const uid = require('uid');
const moment = require('moment');

class Song {
  constructor (name, duration, url, releaseDate, genres, recordCompany = '', artists = []) {
    this.id = uid(16)
    this.name = name
    this.duration = duration
    this.url = url
    this.releaseDate = releaseDate
    this.genres = genres
    this.recordCompany = recordCompany
    this.artists = artists
    this.createdAt = moment().format()
    this.deletedAt = ''
  }
}

module.exports = Song