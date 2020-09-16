const uid = require('uid');
const moment = require('moment');

class Follow {
  constructor(follower, following) {
    this.id = uid();
    this.follower = follower;
    this.following = following;
    this.createdAt = moment().format();
    this.deletedAt = '';
  }
}

module.exports = Follow;
