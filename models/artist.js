const uid = require('uid');
const moment = require('moment');

class Artist {
  constructor (name, genres) {
    this.id = uid()
    this.name = name
    this.albums = []
    this.singles = []
    this.genres = []
    this.createdAt = moment().format()
    this.deletedAt = ''
  }
}

module.exports = Artist