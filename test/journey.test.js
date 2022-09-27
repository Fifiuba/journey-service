const {Journey} = require('../model/journey')

describe("Journey", () => {
    let obelisco = {
        "lat":  -34.603623063963404, 
        "long": -58.381579834119755
    }

    let canchaBoca = {
        "lat":-34.6355091668349,
        "long":-58.36472489104977,
    }

    test('01_distance_from_x_y_should_be_close_to_4km', () => {

        const journey = new Journey(obelisco,canchaBoca);
        let distance = journey.distance();

        expect(distance).toBeCloseTo(4)
    });

    test('02_journey_trip_should_have_start_timestamp_finish_timestamp',() => {
        let start = new Date()
        let end = new Date()
        end.setMinutes(start.getMinutes() + 30)

        const journey = new Journey(obelisco,canchaBoca);
        journey.setStart(start);
        journey.setEnd(end);

        expect(journey.duration()).toBe(30)
    });

    test('03_journey_price_should_be_correct_value', () => {
        const journey = new Journey(obelisco,canchaBoca);

        expect(Math.round(journey.cost())).toBeCloseTo(40)
     })
    
})