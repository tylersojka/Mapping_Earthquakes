console.log("im working, you fucking tit.")



// mapbox://styles/tylersojka/ckiep8ygt3dw019pmeneu4iuj -- treasure red scripty 

// mapbox://styles/tylersojka/ckieoug8k3uct1akuuijpvmfb -- standard

// We create the tile layer that will be a background option of our map.
let style1 = L.tileLayer('https://api.mapbox.com/styles/v1/tylersojka/ckieoug8k3uct1akuuijpvmfb/tiles/{z}/{x}/{y}?access_token={accessToken}', 
    {maxZoom: 18,
    accessToken: API_KEY});

let style2 = L.tileLayer('https://api.mapbox.com/styles/v1/tylersojka/ckiep8ygt3dw019pmeneu4iuj/tiles/{z}/{x}/{y}?access_token={accessToken}', 
    {maxZoom: 18,
    accessToken: API_KEY});

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', 
{maxZoom: 18,
accessToken: API_KEY});

let satStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', 
{maxZoom: 18,
accessToken: API_KEY});

// Create a base layer that holds both maps.
let baseMaps = {
  Streets: streets,
  Satellite: satStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Accessing the airport GeoJSON URL
// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/tylersojka/Mapping_Earthquakes/main/torontoNeighborhoods.json";

myStyle = {
  color: "blue",
  fillColor: "#ffffa1",
  weight: 1
}
// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`
      <h2> Neighborhood: ${feature.properties.AREA_NAME}`);
    }
  }).addTo(map);
});
