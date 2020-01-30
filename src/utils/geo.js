export default {
  locate() {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1000 * 30
    };
    return new Promise(((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (cb) => {
          console.log(`determined location`, cb);
          resolve(cb)
        },
        (cb) => {
          console.error(`could not determine location`, cb);
          reject(cb)
        },
        options
      )
    }))
  }
}
