class PriceCalculator {
  constructor(modality, distance) {
    this.modality = modality;
    this.distance = distance;
  }

  calculate() {
    const BASE_PRICE = 100;
    let price = this.distance * BASE_PRICE;
    price = this.modality.apply(price);

    return price;
  }
}

module.exports = {PriceCalculator};
