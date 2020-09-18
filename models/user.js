const uuid = require('uuid');

class User {
  constructor(name, userName, email, password) {
    this.id = uuid.v4();
    this.name = name;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.queue = [];
    this.savedSongs = [];
    this.savedLists = [];
    this.favSongs = [];
    this.favLists = [];
    this.broadcast = null;
    this.attendedBroadcast = null;
    this.createdAt = new Date();
    this.deletedAt = null;
  }

  addSong(...args) {
    // TODO: get song file
    for (let i = 0; i < arguments.length; i += 1) {
      this.saveSongs(args[i]);
    }
  }

  saveSongs(...args) {
    for (let i = 0; i < arguments.length; i += 1) {
      this.savedSongs.push(args[i]);
    }
    return this.savedSongs;
  }

  favoriteSongs(...args) {
    for (let i = 0; i < arguments.length; i += 1) {
      this.favSongs.push(args[i]);
    }
    return this.savedSongs;
  }

  savePlaylist(list) {
    return this.savedLists.push(list);
  }

  favoritePlaylist(list) {
    return this.favLists.push(list);
  }

  addToQueue(song) {
    return this.queue.push(song);
  }

  startBroadcasting(broadcast) {
    broadcast.isActive = true;
    this.broadcast = broadcast.id;
    this.attendedBroadcast = broadcast.id;
  }

  joinBroadCast(broadcast) {
    this.attendedBroadcast = broadcast.id;
  }

  deleteUser() {
    this.deletedAt = new Date();
  }
}

module.exports = User;
