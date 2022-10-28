
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
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
        }
    }

    isShort(from, lat1, lng1){
      console.log("lat1 ", lat1, " lng2: " ,lng1);
      console.log("lat2: ", from[0], " lng2: " ,from[1]);
      dist = distance(lat1, lng1, from[0], from[1], "K");
      console.log(dist);
      if (dist <= 5){
          console.log("entre");
          return true;
      }
      return false;
    }
}

module.exports = {DistanceCalculator}