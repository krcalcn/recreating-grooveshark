const BaseDatabase = require('./base-database');
const User = require('../models/user');

class UserDatabase extends BaseDatabase {
}

module.exports = new UserDatabase(User);
