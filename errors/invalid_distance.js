class InvalidDistanceError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidDistanceError';
    this.code = 500;
  }
}

class InvalidTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidTokenError';
    this.code = 401;
  }
}

module.exports = {InvalidDistanceError, InvalidTokenError};
