class Journey{

    constructor(from, to){
        this.from = from;
        this.to = to;
    }

    distance() {
        const LAT_TO_KM = 111
        let x = this.from["lat"] - this.to["lat"];
        let y = this.from["long"] - this.to["long"]

        let result = Math.sqrt(Math.pow(x*LAT_TO_KM,2) + Math.pow(y*LAT_TO_KM,2))
 
        return result
    }

    setStart(timestamp){
      this.start = timestamp;
      console.log(timestamp);
    }

    setEnd(timestamp){
        this.end = timestamp;
        console.log(timestamp);
    }

    duration() {
        const MINUTE = 60000
        let milisegs = this.end - this.start
        let minutes = milisegs / MINUTE
        return minutes
    }

    cost() {
        const BASE_PRICE = 10;
        return this.distance() * BASE_PRICE 
    }


    
}

module.exports = {Journey}