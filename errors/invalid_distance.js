class InvalidDistanceError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidDistanceError';
  }
}

class InvalidTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidTokenError';
  }
}

module.exports = {InvalidDistanceError, InvalidTokenError};
