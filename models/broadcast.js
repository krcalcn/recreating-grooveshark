const uid = require('uid');
const moment = require('moment');

class Broadcast {
  constructor (streamerId, name, queue, isPublic, whoCanJoin) {
    this.id = uid()
    this.streamerId = streamerId
    this.name = name
    this.queue = queue
    this.isActive = true
    this.isPublic = isPublic
    this.whoCanJoin = whoCanJoin
    this.createdAt = moment().format()
    this.deletedAt = ''
  }
}

module.exports = Broadcast