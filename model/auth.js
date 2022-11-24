const {InvalidTokenError} = require('../errors/invalid_parameters');

class Auth {
  validate(req) {
    const re = /^(Bearer\s)(.*)/g;
    const header = req['Authorization'];
    const token = re.exec(header);

    if (token == null) {
      throw new InvalidTokenError('No token valid');
    }
    return token[2];
  }
}
module.exports = {Auth};
