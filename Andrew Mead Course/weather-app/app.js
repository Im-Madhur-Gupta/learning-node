const axios = require("axios");

let coor = {};

axios
  .get(
    "http://api.positionstack.com/v1/forward?access_key=68daff87cb8e55f7409d458323794f40&query=1600 Pennsylvania Ave NW, Washington DC"
  )
  .then((res) => {
    coor.lat = res.data.data[0].latitude;
    coor.lon = res.data.data[0].longitude;
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=9560bd97d3b08e937209504592651005&query=${coor.lat},${coor.lon}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

// axios khud hi res ko json se js obj mai parse kar deta he
