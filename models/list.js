const uuid = require('uuid');

class List {
  constructor(ownerId, name, isPublic) {
    this.id = uuid.v4();
    this.ownerId = ownerId;
    this.name = name;
    this.songs = [];
    this.isPublic = isPublic;
    this.whoCanSee = [];
    this.whoCanAdd = [];
    this.createdAt = new Date();
    this.deletedAt = null;
  }

  addToList(...args) {
    for (let i = 0; i < arguments.length; i += 1) {
      this.songs.push(args[i]);
    }
    return this.songs;
  }

  deleteList() {
    this.deletedAt = new Date();
  }
}

module.exports = List;
