class PriceCalculator{
    
    constructor(modality,calculator){
        this.modality = modality;
        this.distanceCalculator = calculator;
    }
    
    calculate(){
        const BASE_PRICE = 100;
        let price = this.distanceCalculator.calculate() * BASE_PRICE;
        price = this.modality.apply(price);
        
        return price;
    }
}

module.exports = {PriceCalculator}