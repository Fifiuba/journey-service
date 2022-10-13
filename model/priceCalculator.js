const {InvalidDistanceError} = require('../errors/invalid_distance');

class PriceCalculator {
  constructor(modality, distance) {
    this.modality = modality;
    this.distance = distance;
  }

  calculate() {
    const BASE_PRICE = 100;
    if (this.distance < 0) {
      throw new InvalidDistanceError('Negative distance!');
    }

    let price = this.distance * BASE_PRICE;
    price = this.modality.apply(price);
    return price;
  }
}

module.exports = {PriceCalculator};
