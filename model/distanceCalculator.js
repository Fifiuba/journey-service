class DistanceCalculator{

    constructor(from,to){
        this.to = to;
        this.from = from;
    }

    calculate(){
        const LAT_TO_KM = 111
        let x = this.from["lat"] - this.to["lat"];
        let y = this.from["long"] - this.to["long"]

        let result = Math.sqrt(Math.pow(x*LAT_TO_KM,2) + Math.pow(y*LAT_TO_KM,2))
 
        return result;
    }
}

module.exports = {DistanceCalculator}
