const Crypto = require('../models/Crypto');

//creating crypto offers
exports.create = (ownerId, cryptoData) => Crypto.create({...cryptoData, owner: ownerId});

//for catalog
exports.getAll = () => Crypto.find({}).lean();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).lean();