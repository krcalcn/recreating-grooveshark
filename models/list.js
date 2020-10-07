const uuid = require('uuid');

class List {
  constructor(
    ownerId,
    name,
    isPublic,
    id = uuid.v4(),
    songs = [],
    whoCanSee = [],
    whoCanAdd = [],
    createdAt = new Date(),
    deletedAt = null,
  ) {
    this.ownerId = ownerId;
    this.name = name;
    this.isPublic = isPublic;
    this.id = id;
    this.songs = songs;
    this.whoCanSee = whoCanSee;
    this.whoCanAdd = whoCanAdd;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }

  static create({
    ownerId, name, isPublic, id, songs, whoCanSee, whoCanAdd, createdAt, deletedAt,
  }) {
    return new List(ownerId, name, isPublic, id, songs, whoCanSee, whoCanAdd, createdAt, deletedAt);
  }
}

module.exports = List;
