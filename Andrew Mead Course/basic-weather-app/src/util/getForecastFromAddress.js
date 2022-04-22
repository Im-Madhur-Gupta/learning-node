const axios = require("axios");

const getForecastFromAddress = async (address, callback) => {
  try {
    const geoRes = await axios.get(
      `http://api.positionstack.com/v1/forward?access_key=68daff87cb8e55f7409d458323794f40&query=${address}`
    );
    const coor = {
      lat: geoRes.data.data[0].latitude,
      lon: geoRes.data.data[0].longitude,
    };

    const forecastRes = await axios.get(
      `http://api.weatherstack.com/current?access_key=9560bd97d3b08e937209504592651005&query=${coor.lat},${coor.lon}`
    );
    const forecastData = forecastRes.data.current;
    callback(forecastData);
  } catch (err) {
    console.log(err);
  }
};

module.exports = getForecastFromAddress;
