const {InvalidDistanceError} = require('../errors/invalid_distance');

class PriceCalculator {
  constructor(basePrice, modality, distance) {
    this.basePrice = basePrice;
    this.modality = modality;
    this.distance = distance;
  }

  calculate() {
    if (this.distance < 0) {
      throw new InvalidDistanceError('Negative distance!');
    }

    let price = this.distance * this.basePrice;

    price = this.modality.apply(price);
    return price;
  }
}

module.exports = {PriceCalculator};
