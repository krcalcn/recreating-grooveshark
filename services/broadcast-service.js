const BaseService = require('./base-service');
const Broadcast = require('../models/broadcast');

class BroadcastService extends BaseService {

}

module.exports = new BroadcastService(Broadcast);
