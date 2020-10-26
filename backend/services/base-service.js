class BaseService {
  constructor(model) {
    this.model = model;
  }

  save(objects) {
    return this.model.insertMany(objects);
  }

  load() {
    return this.model.find();
  }

  async insert(object) {
    const instance = await this.model.create(object);
    return instance;
  }

  async removeBy(property, value) {
    return this.model.remove({ [property]: value });
  }

  async update(id, object) {
    return this.model.findByIdAndUpdate(id, object);
  }

  async findBy(property, value) {
    return this.model.find({ [property]: value });
  }

  async query(obj) {
    return this.model.find(obj);
  }

  async find(id) {
    return this.model.findById(id);
  }
}

module.exports = BaseService;
