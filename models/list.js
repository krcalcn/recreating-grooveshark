const uid = require('uid');
const moment = require('moment');

class List {
  constructor (ownerId, name, isPublic) {
    this.id = uid(32)
    this.ownerId = ownerId
    this.name = name
    this.songs = []
    this.isPublic = isPublic
    this.whoCanSee = []
    this.whoCanAdd = []
    this.createdAt = moment().format()
    this.deletedAt = ''
  }
  addToList () {
    if(!arguments[0]) return 
    for (var i = 0; i < arguments.length; i++) {
      this.songs.push(arguments[i])
    }
    return this.songs
  }
}

module.exports = List