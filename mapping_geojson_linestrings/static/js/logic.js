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

// Create a base layer that holds both maps.
let baseMaps = {
  Standard: style1,
  Dark: style2
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [44, -0],
  zoom: 2.5,
  layers: [style1]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/tylersojka/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`
      <h2> Airline: ${feature.properties.airline} </h2>  
      <hr>
      <h2>Destination: ${feature.properties.dst}</h2>`);
    }
  }).addTo(map);
  });
