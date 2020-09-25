const uuid = require('uuid');

class Genre {
  constructor(name, id = uuid.v4()) {
    this.name = name;
    this.id = id;
  }

  static create({ name, id }) {
    return new Genre(name, id);
  }
}

module.exports = Genre;
