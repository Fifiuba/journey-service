const {DriverLocationModel} = require('../database/driverLocationSchema');
const {DistanceCalculator} = require('distanceCalculator')

class DriverRepository {
    async getDrivers(){
        return await DriverLocationModel.find();
    }

    async findPossibleDrivers(pickUpPoint, modality/*,price?*/) {
        var drivers = this.getDrivers();
        var distanceCalculator = new DistanceCalculator();
        var closeDrivers = drivers.filter(driver => {
            if (distanceCalculator.isShort()){
                //Como obtenemos una primer posicion de cada driver? Capaz cuando se registran por primera vez?
                return driver;
            }
            //Push notification. Despues vemos de quien es responsabilidad. Diria de hacer una clase.
            return closeDrivers;
        });
    } 
}