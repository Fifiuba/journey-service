const {PriceCalculator} = require('../model/priceCalculator')
const {Modality} = require('../model/modality')


describe("PriceCalculator",() => {
    
    
    test('01_should_be_0_when_no_distance',() => {
        let distance = 0.0;
        const modality = new Modality();

        const priceCalculator = new PriceCalculator(modality,distance)

        expect(priceCalculator.calculate()).toBe(0)
    } )

    test('02_should_be_700_when_distance_is_7_and_modality_standar',() => {
        let distance = 7.0;
        const modality = new Modality('standar');

        const priceCalculator = new PriceCalculator(modality,distance)

        expect(priceCalculator.calculate()).toBe(700)
    } )

})