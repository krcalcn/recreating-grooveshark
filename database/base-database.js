const fs = require('fs');
const flatted = require('flatted');

class BaseDatabase {
  constructor(model) {
    this.model = model;
    this.filename = model.name.toLowerCase();
  }

  save(objects) {
    return new Promise((resolve, reject) => {
      fs.writeFile(`${__dirname}/json/${this.filename}.json`, flatted.stringify(objects, null, 2), (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  load() {
    return new Promise((resolve, reject) => {
      fs.readFile(`${__dirname}/json/${this.filename}.json`, 'utf8', (err, file) => {
        if (err) return reject(err);
        const objects = flatted.parse(file);

        resolve(objects.map(this.model.create));
      });
    });
  }

  async insert(object) {
    const objects = await this.load();
    if (object instanceof this.model) {
      object = this.model.create(object);
    }
    await this.save(objects.concat(object));

    return object;
  }

  async remove(index) {
    const objects = await this.load(this.filename);

    objects.splice(index, 1);
    await this.save(this.filename, objects);
  }

  async removeBy(property, value) {
    const objects = await this.load();

    const index = objects.findIndex((o) => o[property] == value);
    if (index == -1) throw new Error(`${this.model.name} instance with  ${property}: ${value} doesn't exist!`);

    objects.splice(index, 1);
    await this.save(objects);
  }

  async update(object) {
    const objects = await this.load();
    const index = objects.findIndex((o) => o.id == object.id);

    if (index == -1) throw new Error(`${this.model.name} instance with ${object.id} id doesn't exist!`);

    objects.splice(index, 1, object);
    await this.save(objects);
  }

  async findBy(property, value) {
    return (await this.load()).find((o) => o[property] == value);
  }

  async find(id) {
    const objects = await this.load();
    return objects.find((o) => o.id == id);
  }
}

module.exports = BaseDatabase;
