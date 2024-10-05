const axios = require("axios");

axios({
    method: "POST",
    url: "https://detect.roboflow.com/bodymeasure-sotdp/1",
    params: {
        api_key: "YOUR_API_KEY",
        image: "firebase_url_to_image"
    }
})
.then(function(response) {
    console.log(response.data);
})
.catch(function(error) {
    console.log(error.message);
});