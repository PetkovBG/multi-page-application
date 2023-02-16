const Crypto = require('../models/Crypto');

//creating crypto offers
exports.create = (ownerId, cryptoData) => Crypto.create({...cryptoData, owner: ownerId});

//for catalog
exports.getAll = () => Crypto.find({}).lean();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).lean();

//buy crypto
exports.buy = async (cryptoId, userId) => {

    const crypto = await Crypto.findById(cryptoId);

   crypto.buyers.push(userId);

   return crypto.save();

};

//edit crypto
exports.edit = async (cryptoData, cryptoId) => {

    await Crypto.findByIdAndUpdate(cryptoId, cryptoData, {runValidators: true});

}