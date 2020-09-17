const uid = require('uid');
const moment = require('moment');
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
    this.savedSongs = [];
    this.savedLists = [];
    this.favSongs = [];
    this.favLists = [];
    this.createdAt = moment().format();
    this.deletedAt = '';
  }

  createPlaylist(name, isPublic) {
    const createdList = new List(this.id, name, isPublic);
    return createdList;
  }

  addSong(name, duration, url, releaseDate, genres, recordCompany = '', artists = []) {
    const newSong = new Song(name, duration, url,
      releaseDate, genres, this.id, recordCompany, artists);
    this.saveSong(newSong.name); // FIXME: will be newSong.id
    return newSong;
  }

  saveSong(...args) {
    for (let i = 0; i < arguments.length; i += 1) {
      this.savedSongs.push(args[i]);
    }
    return this.savedSongs;
  }

  savePlaylist(list) {
    return this.savedLists.push(list);
  }
}

module.exports = User;
