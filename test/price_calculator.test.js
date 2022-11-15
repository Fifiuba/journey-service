const {PriceCalculator} = require('../model/priceCalculator');
const {Modality} = require('../model/modality');
const {InvalidDistanceError} = require('../errors/invalid_distance');


describe('PriceCalculator', () => {
  test('01_should_be_0_when_no_distance', () => {
    const distance = 0.0;
    const modality = new Modality();

    const priceCalculator = new PriceCalculator(100,modality, distance);

    expect(priceCalculator.calculate()).toBe(0);
  } );

  test('02_should_be_700_when_distance_is_7_and_modality_standar', () => {
    const distance = 7.0;
    const modality = new Modality('standar');

    const priceCalculator = new PriceCalculator(100,modality, distance);

    expect(priceCalculator.calculate()).toBe(700);
  } );

  test('03_should_be_275_when_distance_is_2.5_and_modality_pro', () => {
    const distance = 2.5;
    const modality = new Modality('pro');

    const priceCalculator = new PriceCalculator(100,modality, distance);

    expect(priceCalculator.calculate()).toBe(275);
  } );

  test('04_should_throw_error_negative_distance', () => {
    const distance = -1;
    const modality = new Modality('standar');
    const priceCalculator = new PriceCalculator(100,modality, distance);

    const error = () => {
      priceCalculator.calculate();
    };

    expect(error).toThrow(InvalidDistanceError);
  } );
});
