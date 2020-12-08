// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [treasure]
});

// Create a base layer that holds all three maps.
// street variables being held in mapboxStyles.js
let baseMaps = {
  "Streets": streets,
  "Satellite": satStreets,
  "Treasure": treasure
};

// 1. Add a 2nd layer group for the tectonic plate data.
let allEarthquakes = new L.LayerGroup();
let tectonicPlates = new L.LayerGroup();
let MajorQuakes = new L.LayerGroup();

// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "Earthquakes": allEarthquakes,
  "Tektoniq Plates": tectonicPlates,
  "Major Quakes": MajorQuakes
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
Promise.all([
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"),
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"),
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson")
]).then(([data, teck, major]) => {
  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfoMajor(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColorMajor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the color of the marker based on the magnitude of the earthquake.
  function getColorMajor(magnitude) {
    if (magnitude > 8) {
      return "#000000"
    }
    if (magnitude > 7) {
      return "#1c0b19"
    }
    if (magnitude > 6) {
      return "#581845"
    }
    if (magnitude > 5) {
      return "#900C3F";
    }
    if (magnitude > 4) {
      return "#C70039";
    }
    if (magnitude > 3) {
      return "#FF5733";
    }
    if (magnitude > 2) {
      return "#FFC300";
    }
    if (magnitude > 1) {
      return "#c0f361";
    }
    return "#b3fdd8";
  }
  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		// console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfoMajor,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(allEarthquakes);

  // Then we add the earthquake layer to our map.
  allEarthquakes.addTo(map);

  // Here we create a legend control object.
  let legend = L.control({
  position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

    const magnitudes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const colors = [
      "#b3fdd8",
      "#c0f361",
      "#FFC300",
      "#FF5733",
      "#C70039",
      "#900C3F",
      "#581845",
      "#1c0b19",
      "#000000"
    ];

    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < magnitudes.length; i++) {
      // console.log(colors[i]);
      div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(map);


  // add major earthquakes, for some reason, seems redundant. insert dramatic eyeroll.
  L.geoJson(major, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfoMajor,
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`Major QUAKE! <br> Magnitude: ${feature.properties.mag} <br> Location: ${feature.properties.place}`);
    }
  }).addTo(MajorQuakes);
  MajorQuakes.addTo(map)


  // 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
  myStyle = {
    color: "purple"
  }
//add the fault lines
  L.geoJson(teck, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      console.log(layer);
      layer.bindPopup(`<h2>Tectonic Boundary</h2><h3>Name: ${feature.properties.Name}<hr>Plate A: ${feature.properties.PlateA}<br>Plate B: ${feature.properties.PlateB}</h3>`);
      layer.on('mouseover', function (e){
        e.target.setStyle({
          color: 'red',
          weight: 6
        })
      });
      layer.on("mouseout", function (e) {
        e.target.setStyle({
          color: "purple",
          weight: 3
        })
      });
    }
  }).addTo(tectonicPlates);

  tectonicPlates.addTo(map)

  
  
});