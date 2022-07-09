// var map = L.map("map").setView([43.6532, -79.3832], 14); // toronto
var map = L.map("map").setView([44.137947930123374, -78.18085633533555], 13); // harwood family variety

//add tiles to give credit
var tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

// adding markers
var marker = L.marker([44.14409587140724, -78.17532154406183]).addTo(map);

// adding circles
var circle = L.circle([44.14344667677213, -78.16854956046024], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 400,
}).addTo(map);

// creating a polygon
var polygon = L.polygon([
  [44.122059783984774, -78.24173178042962],
  [44.13204045261772, -78.19383825773592],
  [44.11361802560085, -78.17941870350533],
]).addTo(map);

// adding popup to the marker
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").opnPopup();
// adding popup to the circle
circle.bindPopup("Can you see the circle?");
// popup for the polygon
polygon.bindPopup("Polygon!");
