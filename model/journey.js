const {DistanceCalculator} = require('./distanceCalculator.js');
const {PriceCalculator} = require('./priceCalculator.js');
const {DurationCalculator} = require('./durationCalculator.js');

class Journey{

    constructor(modality, priceCalculator, distanceCalculator, durationCalculator){
        this.modality = modality;
        this.priceCalculator = priceCalculator;
        this.distanceCalculator = distanceCalculator;
        this.durationCalculator = durationCalculator;
    }

    distance() {
        this.distanceCalculator.calculate()
    }

    setStart(timestamp){
      this.start = timestamp;
    }

    setEnd(timestamp){
        this.end = timestamp;
    }

    duration() {
        const MINUTE = 60000
        let milisegs = this.end - this.start
        let minutes = milisegs / MINUTE
        return minutes
    }

    cost() {
        this.priceCalculator.calculate()
    }
}

module.exports = {Journey}