const uid = require('uid');
const moment = require('moment');
const Saved = require('./saved');
const Favorites = require('./favorites');
const List = require('./list');
const Song = require('./song');

class User {
  constructor(name, userName, email, password) {
    this.id = uid();
    this.name = name;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.queue = [];
    this.createdAt = moment().format();
    this.deletedAt = '';
    this.Saved = new Saved(this.id);
    this.Favorites = new Favorites(this.id);
  }

  createPlaylist(name, isPublic) {
    const createdList = new List(this.id, name, isPublic);
    return createdList;
  }

  addSong(name, duration, url, releaseDate, genres, recordCompany = '', artists = []) {
    const newSong = new Song(name, duration, url,
      releaseDate, genres, this.id, recordCompany, artists);
    this.saveSong(newSong.name); // FIXME: will be newSong.id
  }

  saveSong(...args) {
    for (let i = 0; i < arguments.length; i += 1) {
      this.Saved.songs.push(args[i]);
    }
    return this.Saved.songs;
  }

  savePlaylist(list) {
    return this.Saved.listId.push(list);
  }
}

module.exports = User;
