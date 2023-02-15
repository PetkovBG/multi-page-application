const Crypto = require('../models/Crypto');

//creating crypto offers
exports.create = (ownerId, cryptoData) => Crypto.create({...cryptoData, owner: ownerId});

