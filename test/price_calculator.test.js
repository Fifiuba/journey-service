const {PriceCalculator} = require('../model/priceCalculator')
const {DistanceCalculator} = require('../model/distanceCalculator')
const {Modality} = require('../model/modality')


describe("PriceCalculator",() => {
    
    
    test('01_should_be_0_when_no_distance',() => {
        let from = {"lat":  0, "long": 0,}
        let to = {"lat":0,"long":0,}
        const distanceCalculator = new DistanceCalculator(from,to);
        const modality = new Modality();

        const priceCalculator = new PriceCalculator(modality,distanceCalculator)

        expect(priceCalculator.calculate()).toBe(0)
    } )

})