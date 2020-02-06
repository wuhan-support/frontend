import Console from "./Console";

export default {
  locate() {
    const options = {
      enableHighAccuracy: true,
      timeout: 1000 * 180,
      maximumAge: 1000 * 5
    };
    return new Promise(((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (cb) => {
          Console.log(`determined location`, cb);
          resolve(cb)
        },
        (cb) => {
          Console.error(`could not determine location`, cb);
          reject(cb)
        },
        options
      )
    }))
  },
  distance(lat1, lng1, lat2, lng2) {
    const radLat1 = lat1 * Math.PI / 180.0;
    const radLat2 = lat2 * Math.PI / 180.0;
    const a = radLat1 - radLat2;
    const b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s;
  }
}
