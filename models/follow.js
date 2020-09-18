const uuid = require('uuid');

class Follow {
  constructor(follower, following) {
    this.id = uuid.v4();
    this.follower = follower;
    this.following = following;
    this.createdAt = new Date();
    this.deletedAt = null;
  }

  followUser(follower, following) {
    this.follower = follower;
    this.following = following;
  }

  deleteFollow() {
    this.deletedAt = new Date();
  }
}

module.exports = Follow;
