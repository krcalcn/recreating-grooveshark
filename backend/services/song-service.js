const BaseService = require('./base-service');
const Song = require('../models/song');
const userService = require('./user-service');

class SongService extends BaseService {
  async addSong(userId, id, name, duration, releaseDate, artists, genres, recordCompany) {
    const song = await this.insert({
      creatorUserId: userId,
      trackId: id,
      name,
      duration,
      releaseDate,
      artists,
      genres,
      recordCompany,
    });
    const user = await userService.find(userId);
    user.addedSongs.push(song._id);

    await userService.update(userId, user);

    return song;
  }

  async deleteSong(userId, songId) {
    const song = await this.find(songId);
    if (song.creatorUserId == userId) {
      await this.removeBy('_id', song.id);
    }
    return this;
  }
}

module.exports = new SongService(Song);
