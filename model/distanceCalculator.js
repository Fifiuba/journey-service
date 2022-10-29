
class DistanceCalculator {

    calculate(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            var dist = Math.acos(dist);
            var dist = dist * 180/Math.PI;
            var dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
        }
    }

    isShort(from, lat1, lng1){
      var dist = this.calculate(lat1, lng1, from[0], from[1], "K");
      if (dist <= 5){
          return true;
      }
      return false;
    }
}

module.exports = {DistanceCalculator}