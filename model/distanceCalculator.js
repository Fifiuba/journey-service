class DistanceCalculator {
  calculate(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    } else {
      const radlat1 = Math.PI * lat1/180;
      const radlat2 = Math.PI * lat2/180;
      const theta = lon1-lon2;
      const radtheta = Math.PI * theta/180;

      // eslint-disable-next-line max-len
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=='K') {
        dist = dist * 1.609344;
      }
      if (unit=='N') {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  isShort(from, lat1, lng1) {
    const dist = this.calculate(lat1, lng1, from[0], from[1], 'K');
    if (dist <= 2) {
      return true;
    }
  }
}
module.exports = {DistanceCalculator};
