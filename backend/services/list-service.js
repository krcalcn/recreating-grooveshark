const BaseService = require('./base-service');
const List = require('../models/list');
const userService = require('./user-service');

class ListService extends BaseService {
  async createList(userId, name, isPublic) {
    const user = await userService.find(userId);
    const list = await this.insert({ ownerId: userId, name, isPublic });
    user.savedLists.push(list.id);

    await userService.update(userId, user);

    return list;
  }

  async addToList(userId, listId, songs) {
    const list = await this.find(listId);
    if (list.ownerId.id == userId || list.whoCanAdd.includes(userId)) {
      list.songs.push(songs);
    }
    await this.update(listId, list);
  }
}

module.exports = new ListService(List);
