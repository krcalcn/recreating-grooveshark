const bcrypt = require('bcrypt');
const BaseService = require('./base-service');
const User = require('../models/user');
const listService = require('./list-service');
const songService = require('./song-service');
const artistService = require('./artist-service');
const genreService = require('./genre-service');
const broadcastService = require('./broadcast-service');

class UserService extends BaseService {
  async addSong(userId, id, name, duration, releaseDate, artists, genres, recordCompany) {
    const user = await this.find(userId);
    const song = await songService.insert({
      creatorUserId: userId,
      trackId: id,
      name,
      duration,
      releaseDate,
      artists,
      genres,
      recordCompany,
    });
    user.addedSongs.push(song._id);

    await this.update(userId, user);

    return song;
  }

  async createUser({
    name, userName, email, password,
  }) {
    const salt = bcrypt.genSaltSync().toString();
    const pass = bcrypt.hashSync(password, salt);
    // console.log(await bcrypt.compareSync(password, pass));
    const user = await this.insert({
      name, userName, email, password: pass,
    });
    return this;
  }

  async deleteSong(userId, songId) {
    const song = await songService.find(songId);
    if (song.creatorUserId == userId) {
      await songService.removeBy('_id', song.id);
    }
    return this;
  }

  async saveSong(userId, songId) {
    const user = await this.find(userId);
    user.savedSongs.push(songId);
    await this.update(userId, user);
  }

  async addToFavoriteSongs(userId, songId) {
    const user = await this.find(userId);
    user.favoriteSongs.push(songId);
    await this.update(userId, user);
  }

  async saveList(userId, listId) {
    const user = await this.find(userId);
    user.savedLists.push(listId);
    await this.update(userId, user);
  }

  async addToFavoriteLists(userId, listId) {
    const user = await this.find(userId);
    user.favoriteLists.push(listId);
    await this.update(userId, user);
  }

  async addToQueue(userId, songId) {
    const user = await this.find(userId);
    user.queue.push(songId);
    await this.update(userId, user);
  }

  async createArtist(userId, name) {
    const user = await this.find(userId);
    let artist;
    if (user) {
      artist = await artistService.insert({ name });
    } else {
      return new Error('Invalid User!');
    }
    return artist;
  }

  async createGenre(userId, name) {
    const user = await this.find(userId);
    let genre;
    if (user) {
      genre = await genreService.insert({ name });
    } else {
      return new Error('Invalid User!');
    }
    return genre;
  }

  async createBroadcast(userId, name, isActive, isPublic) {
    const bc = await broadcastService.insert({
      userId, name, isActive, isPublic,
    });
    const user = await this.find(userId);
    user.broadcast = bc;
    user.attendedBroadcast = bc;
    await this.update(userId, user);
  }

  async followUser(userId, following) {
    const user = await this.find(userId);
    user.following.push(following);
    await this.update(userId, user);
  }

  async deleteUser(userId) {
    await this.removeBy('_id', userId);
  }
}

module.exports = new UserService(User);
