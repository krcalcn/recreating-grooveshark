const BaseDatabase = require('./base-database');
const Broadcast = require('../models/broadcast');

class BroadcastDatabase extends BaseDatabase {

}

module.exports = new BroadcastDatabase(Broadcast);
