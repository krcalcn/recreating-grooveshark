const uuid = require('uuid');

class Broadcast {
  constructor(
    userId,
    name,
    isActive,
    isPublic,
    queue = [],
    id = uuid.v4(),
    whoCanJoin = [],
    chatRoom = { id: this.id, messages: [] },
    createdAt = new Date(),
    deletedAt = null,
  ) {
    this.streamerId = userId;
    this.name = name;
    this.isActive = isActive;
    this.isPublic = isPublic;
    this.queue = queue;
    this.id = id;
    this.whoCanJoin = whoCanJoin;
    this.chatRoom = chatRoom;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }

  static create({
    streamerId, name, isActive, isPublic,
    queue, id, whoCanJoin, chatRoom, createdAt, deletedAt,
  }) {
    return new Broadcast(streamerId, name, isActive, isPublic,
      queue, id, whoCanJoin, chatRoom, createdAt, deletedAt);
  }

  /** TODO:
   *    - addToQueue()
   *    - removeFromQueue()
   * */
}

module.exports = Broadcast;
