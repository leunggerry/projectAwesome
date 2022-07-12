/** Constants
 **************************************************************************************************/
// Yelp API constants
const getCall = document.getElementById("download-button");
const postLocation = document.getElementById("post");
const print = document.getElementById("bottom");
const myYelpToken = config.YELP_API_TOKEN;
const corsProxy = config.CORS_PROXY;
// const myYelpToken = "";
// const corsProxy = "";
// // yelp api call
const yelp_api_url =
  corsProxy +
  "https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=43.641883850097656&longitude=-79.38628387451172&radius=8046&limit=5";

/** Global Variables
 **************************************************************************************************/
// Leaflet Constants
// map hardcoded to CN tower
var map = L.map("map").setView([43.64253512292522, -79.3871211745876], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

/** Function Definitions
 **************************************************************************************************/
function getCallFunction() {
  // CALL YELP API JSON
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + myYelpToken);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  // write an async function
  async function getBusiness() {
    const response = await fetch(yelp_api_url, requestOptions);
    data = await response.json();
    console.log(data);
    const totalResults = data.businesses.length;

    // If our results are greater than 0, continue
    if (totalResults > 0) {
      // console.log('Here are ' + resultsLimit + ' restaurants near you')
      console.log("We found " + totalResults + " businesses");
      // Iterate through the JSON array of 'businesses' returned by API
      $.each(data.businesses, function (i, item) {
        // Store each business's object in a variable
        var id = item.id;
        var alias = item.alias;
        var name = item.name;
        var image = item.image_url;
        var isClosed = item.is_closed;
        var reviewCount = item.review_count;
        var categoriesAlias = item.categories.alias;
        var categoriesTitle = item.categories.title;
        var rating = item.rating;
        var coordinates = item.coordinates;
        var lat = coordinates.latitude;
        var lon = coordinates.longitude;
        var price = item.price;
        var address = item.location.address1;
        var city = item.location.city;
        var province = item.location.state;
        var postalCode = item.location.zip_code;
        var phone = item.display_phone;
        var distance = item.distance;
      });
    } else {
      console.log("We found " + data.total + " businesses");
    }
  }
  getBusiness();
}

var address = '290 Bremner Blvd, Toronto, ON M5V 3L9'
function locate() {
  $.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q='+address, function(data){
       console.log(data);
  });
}


/** Main Function Calls
 **************************************************************************************************/
// HANDLE GET
getCall.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log("User clicked on GET");
  // getCallFunction();
  locate();
});
