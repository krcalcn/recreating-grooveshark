const uuid = require('uuid');
const Broadcast = require('./broadcast');
const List = require('./list');
const listDatabase = require('../database/list-database');
// const userDatabase = require('../database/user-database'); // Fails (model imports itself)
// const { listDatabase } = require('../database'); // Also Fails

class User {
  constructor(
    id = uuid.v4(),
    name,
    userName,
    email,
    password,
    queue = [],
    ownedLists = [],
    addedSongs = [],
    savedSongs = [],
    savedLists = [],
    favoriteSongs = [],
    favoriteLists = [],
    followers = [],
    following = [],
    broadcast = null,
    attendedBroadcast = null,
    createdAt = new Date(),
    deletedAt = null,
  ) {
    this.id = id;
    this.name = name;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.queue = queue;
    this.ownedLists = ownedLists;
    this.addedSongs = addedSongs;
    this.savedSongs = savedSongs;
    this.savedLists = savedLists;
    this.favoriteSongs = favoriteSongs;
    this.favoriteLists = favoriteLists;
    this.followers = followers;
    this.following = following;
    this.broadcast = broadcast;
    this.attendedBroadcast = attendedBroadcast;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }

  addSong(songs) {
    // TODO: get song file

    if (Array.isArray(songs)) {
      songs.forEach((e) => {
        this.saveSongs([e]);
        this.addedSongs.push(e);
      });
    } else {
      this.saveSongs(songs);
      this.addedSongs.push(songs);
    }
  }

  deletesong(songId) {
    // TODO: select song by id if ownerId equals this.id, delete the song
    return this.addedSongs;
  }

  saveSongs(songs) {
    if (Array.isArray(songs)) {
      songs.forEach((e) => {
        this.savedSongs.push(e);
      });
      return this.savedSongs;
    }
    this.savedSongs.push(songs);
    return this.savedSongs;
  }

  addToFavoriteSongs(songs) {
    if (Array.isArray(songs)) {
      songs.forEach((element) => {
        this.favoriteSongs.push(element);
      });
    } else {
      this.favoriteSongs.push(songs);
    }
  }

  saveList(list) {
    return this.savedLists.push(list);
  }

  addToFavoriteLists(list) {
    return this.favoriteLists.push(list);
  }

  addToQueue(song) {
    return this.queue.push(song);
  }

  createList(ownerId, name, isPublic) {
    const newList = new List(ownerId, name, isPublic);
    this.ownedLists.push(newList.id);
    this.savedLists.push(newList.id);
    return newList;
  }

  async addToList(requesterId, listId, songs) {
    const list = await listDatabase.findBy('id', listId);
    if (list.ownerId === requesterId || list.whoCanAdd.includes(requesterId)) {
      songs.forEach((e) => {
        list.songs.push(e);
      });
    } else {
      throw new Error(`You don't have permission to add songs to ${this.name} list`);
    }
    return list;
  }

  createBroadcast(userId, name, isActive, isPublic, queue) {
    const bc = new Broadcast(userId, name, isActive, isPublic, queue);
    this.broadcast = bc;
    this.startBroadcasting(bc);
    return bc;
  }

  startBroadcasting(broadcast) {
    broadcast.isActive = true;
    this.broadcast = broadcast;
    this.attendToBroadcast(broadcast);
  }

  attendToBroadcast(broadcast) {
    this.attendedBroadcast = broadcast;
    this.queue = broadcast.queue;
  }

  joinBroadCast(broadcast) {
    this.attendedBroadcast = broadcast.id;
  }

  followUser(following) {
    this.following.push(following.id);
    following.followers.push(this.id);
  }

  freezeUser() {
    this.deletedAt = new Date();
  }

  static create({
    id,
    name,
    userName,
    email,
    password,
    queue,
    ownedLists,
    addedSongs,
    savedSongs,
    savedLists,
    favoriteSongs,
    favoriteLists,
    followers,
    following,
    broadcast,
    attendedBroadcast,
    createdAt,
    deletedAt,
  }) {
    return new User(
      id,
      name,
      userName,
      email,
      password,
      queue,
      ownedLists,
      addedSongs,
      savedSongs,
      savedLists,
      favoriteSongs,
      favoriteLists,
      followers,
      following,
      broadcast,
      attendedBroadcast,
      createdAt,
      deletedAt,
    );
  }
}

module.exports = User;
