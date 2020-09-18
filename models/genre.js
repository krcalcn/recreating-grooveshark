const uuid = require('uuid');

class Genre {
  constructor(name) {
    this.id = uuid.v4();
    this.name = name;
  }
}

module.exports = Genre;
