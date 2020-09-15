const uid = require('uid');
const moment = require('moment');
const Saved = require('./saved');
const Favorites = require('./favorites');
const List = require('./list');
const Song = require('./song');

class User {
  constructor (name, userName, email, password) {
    this.id = uid()
    this.name = name
    this.userName = userName
    this.email = email
    this.password = password
    this.queue = []
    this.createdAt = moment().format()
    this.deletedAt = ''
    this.Saved = new Saved(this.id)
    this.Favorites = new Favorites(this.id)
  }
  createPlaylist (name, isPublic) {
    const createdList = new List(this.id, name, isPublic)
    return createdList
  }
  deletePlaylist (list) {
    //
  }
}

module.exports = User