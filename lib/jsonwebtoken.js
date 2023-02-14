const util = require('util');
const jwt = require('jsonwebtoken');

exports.sign = util.promisify(jwt.sign); //takes payload and secret as two parameters
exports.verify = util.promisify(jwt.verify); //takes token and the secret key as two parameters