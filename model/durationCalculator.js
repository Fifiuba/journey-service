class DurationCalculator{
    

    constructor (start, end){
        this.start = start;
        this.end = end;
    }

    calculate(){
        const MINUTE = 60000
        let milisegs = this.end - this.start
        let minutes = milisegs / MINUTE
        return minutes
    }
}