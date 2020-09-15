const uid = require('uid');

class Genre {
  constructor(name) {
    this.id = uid();
    this.name = name;
  }
}

module.exports = Genre;
