const {InvalidTokenError} = require('../errors/invalid_parameters');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class Auth {
  validate(headers) {
    const authHeader = headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) throw new InvalidTokenError('No token specified');
    try {
      jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, ['HS256']);
      return true;
    } catch (err) {
      throw new InvalidTokenError('Token is not authentic');
    }
  }
}
module.exports = {Auth};
