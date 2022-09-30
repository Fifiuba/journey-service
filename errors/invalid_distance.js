class InvalidDistanceError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidDistanceError';
  }
}

module.exports = {InvalidDistanceError};
