

// "streets": "mapbox/streets-v11"
// "outdoors": "mapbox/outdoors-v11",
// "light": "mapbox/light-v10",
// "dark": "mapbox/dark-v10",
// "satellite": "mapbox/satellite-v9",
// "satStreets": "mapbox/satellite-streets-v11",
// "treasure": "tylersojka/ckiep8ygt3dw019pmeneu4iuj",
// "standard": "tylersojka/ckieoug8k3uct1akuuijpvmfb"

const streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', 
{maxZoom: 18,
accessToken: API_KEY});

const satStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', 
{maxZoom: 18,
accessToken: API_KEY});

const treasure = L.tileLayer('https://api.mapbox.com/styles/v1/tylersojka/ckiep8ygt3dw019pmeneu4iuj/tiles/{z}/{x}/{y}?access_token={accessToken}', 
    {maxZoom: 18,
    accessToken: API_KEY});

const standard = L.tileLayer('https://api.mapbox.com/styles/v1/tylersojka/ckieoug8k3uct1akuuijpvmfb/tiles/{z}/{x}/{y}?access_token={accessToken}', 
    {maxZoom: 18,
    accessToken: API_KEY});