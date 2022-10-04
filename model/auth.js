class Auth {
  validate(req) {
    const re = /^(Bearer\s)(.*)/g;
    const header = req['Authorization'];
    const token = re.exec(header);

    return token[2];
  }
}
module.exports = {Auth};
