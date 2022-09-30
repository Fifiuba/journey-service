
class Modality {
  constructor(type) {
    this.type = type;
  }
  apply(price) {
    if (this.type === 'standar') {
      return price;
    }

    return price * 1.10;
  }
}

module.exports = {Modality};
