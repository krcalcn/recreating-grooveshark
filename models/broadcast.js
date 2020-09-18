const uuid = require('uuid');

class Broadcast {
  constructor(
    userId,
    name,
    isActive,
    isPublic,
    queue = [],
    whoCanJoin = [],
  ) {
    this.id = uuid.v4();
    this.streamerId = userId;
    this.name = name;
    this.queue = queue;
    this.isActive = isActive;
    this.isPublic = isPublic;
    this.whoCanJoin = whoCanJoin;
    this.createdAt = new Date();
    this.deletedAt = null;
  }
  /** TODO:
   *    - addToQueue()
   *    - removeFromQueue()
   *
   * */
}

module.exports = Broadcast;
