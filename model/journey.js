class Journey {
  constructor(modality, priceCalculator) {
    this.modality = modality;
    this.priceCalculator = priceCalculator;
  }

  distance() {
    this.distanceCalculator.calculate();
  }

  setStart(timestamp) {
    this.start = timestamp;
  }

  setEnd(timestamp) {
    this.end = timestamp;
  }

  duration() {
    const MINUTE = 60000;
    const milisegs = this.end - this.start;
    const minutes = milisegs / MINUTE;
    return minutes;
  }

  cost() {
    this.priceCalculator.calculate();
  }
}

module.exports = {Journey};
