const fs = require('fs');
const flatted = require('flatted');

class BaseDatabase {
  constructor(model) {
    this.model = model;
    this.filename = model.name.toLowerCase();
  }

  save(objects) {
    fs.writeFileSync(`./database/${this.filename}.json`, flatted.stringify(objects, null, 2));
  }

  load() {
    const file = fs.readFileSync(`./database/${this.filename}.json`, 'utf8');
    const objects = flatted.parse(file);

    return objects.map(this.model.create);
  }

  insert(object) {
    const objects = this.load(this.filename);
    this.save(objects.concat(object));
  }

  remove(index) {
    const objects = this.load(this.filename);

    objects.splice(index, 1);
    this.save(this.filename, objects);
  }

  update(object) {
    const objects = this.load();
    const index = objects.findIndex((o) => o.id == object.id);

    if (index == -1) throw new Error(`${this.model.name} instance with ${object.id} id doesn't exist!`);

    objects.splice(index, 1, object);
    this.save(objects);
  }

  findById(id) {
    const objects = this.load(this.filename);
    return objects.find((o) => o.id == id);
  }
}

module.exports = BaseDatabase;
