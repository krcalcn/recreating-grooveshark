const BaseDatabase = require('./base-database');
const List = require('../models/list');

class ListDatabase extends BaseDatabase {
}

module.exports = new ListDatabase(List);
