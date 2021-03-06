/** Constants
 **************************************************************************************************/

// Yelp API constants
const getCall = document.getElementById("download-button");
const formEl = document.getElementById("address-form");
const addressInputEl = document.getElementById("address-input");
const printedResults = document.getElementById("notify");
// const storeFavorites = document.getElementById("saved-favorites");
const myYelpToken = config.YELP_API_TOKEN;
const corsProxy = config.CORS_PROXY;
// const myYelpToken = "";
// const corsProxy = "";

// yelp api call
const yelp_api_url =
  corsProxy + "https://api.yelp.com/v3/businesses/search?term=restaurants&radius=8046&limit=5";

//mycorsproxy-sen.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&radius=8046&limit=5&latitude=0&longitude=0
/** Global Variables
 **************************************************************************************************/
// Leaflet Constants
// map hardcoded to CN tower
var map = L.map("map").setView([43.64253512292522, -79.3871211745876], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

//User location default set to 0, 0
var userLocation = {
  longitude: 0,
  latitude: 0,
};

var favouriteStores = [];
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

  const yelpAPIURLUserLocation =
    yelp_api_url + "&latitude=" + userLocation.latitude + "&longitude=" + userLocation.longitude;
  async function getBusiness() {
    //async function GETs YELP data
    const response = await fetch(yelpAPIURLUserLocation, requestOptions);
    data = await response.json();
    console.log(data);
    const totalResults = data.businesses.length;

    // If our results are greater than 0, continue
    if (totalResults > 0) {
      // Notify user that we found results
      $("#notify").append("<h5>We found " + totalResults + " results!</h5>");
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

        // Print results to page
        $("#favorites").append(
          '<li class="collection-item avatar location-item"' +
            'data-id="' +
            id +
            '"><img src="' +
            image +
            '" alt="the business" class="circle"><span class="title">' +
            name +
            "</span><p>" +
            address +
            " " +
            city +
            " " +
            province +
            " " +
            postalCode +
            "<br>" +
            rating +
            " stars " +
            "<br>" +
            phone +
            '</p><a href="#!" class="secondary-content" id="fav-btn"><i class="material-icons">grade</i></a>'
        );
        var place = {
          id: id,
          name: name,
          reviewCount: reviewCount,
          categoriesTitle: categoriesTitle,
          rating: rating,
          latitude: lat,
          longtitude: lon,
          price: price,
          address: address,
          city: city,
          province: province,
          postalCode: postalCode,
          phone: phone,
        };
        console.log(place);
        saveRestaurants(place);
        markRestaurant(place);
      });
    } else {
      console.log("We found " + data.total + " businesses");
      $("#notify").append("<h5>We found no results!</h5>");
    }
  }
  getBusiness();
}

function convertAddressToLatLong(address) {
  // User must enter an address
  // if (!addressInput) {
  //   alert("Please enter a valid address");
  //   return false;
  // }

  //var address = "290 Bremner Blvd, Toronto, ON M5V 3L9";
  //  console.log(address);
  $.get("https://nominatim.openstreetmap.org/search?format=json&q=" + address, function (data) {
    console.log(data);
    //console.log(data[0].boundingbox[0]);
    userLocation.latitude = data[0].boundingbox[0];
    userLocation.longitude = data[0].boundingbox[2];
    // console.log(userLocation.longitude);
    // console.log(userLocation.latitude);
    // map = L.map("map").flyTo([userLocation.longitude, userLocation.latitude], 13);
    //move map to the location
    map.flyTo([userLocation.latitude, userLocation.longitude], 14);
  });
}

// mark the restaurant
function markRestaurant(place) {
  // mark the restaurant on the map
  var marker = L.marker([place.latitude, place.longtitude]).addTo(map);
  marker.bindPopup("Place: " + place.name + "<br>Address: " + place.address);
}
// save favourite restaurants to localstorage
function saveRestaurants(store) {
  console.log("saving restaurant " + store);
  favouriteStores.push(store);
  localStorage.setItem("favouriteRestaurants", JSON.stringify(favouriteStores));
}

function loadLocalStorage() {
  var tempRest = localStorage.getItem("favouriteRestaurants");

  if (!tempRest) {
    return [];
  }
  tempRest = JSON.parse(tempRest);
  favouriteStores = tempRest;
}

/** Navigation Function Calls
 **************************************************************************************************/
(function ($) {
  $(function () {
    $(".sidenav").sidenav();
    $(".parallax").parallax();
  });
})(jQuery);

/** Main Function Calls
 **************************************************************************************************/
// HANDLE GET
getCall.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log("User clicked on GET");

  var address = document.querySelector("input[name='Address']").value;
  convertAddressToLatLong(address);
  setTimeout(getCallFunction, 3000);
  console.log("fvorites " + favouriteStores);
  setTimeout(saveFavorites, 2000);
});
// HANDLE FAVORITES
function saveFavorites() {
  document.querySelector(".location-view").addEventListener("click", onClick2); // targe will be ul

  function onClick2(e) {
    // alert(e.target.tagName)
    var li = e.target;
    if (e.target.tagName == "I") {
      //TODO: Allow user to save favorites
      console.log("This is the Star!");
      var pElement = e.target.parentElement.previousElementSibling;
      var restaurantName = pElement.previousElementSibling.textContent;
      var storeFavorites = document.getElementById("saved-favorites");
      storeFavorites = pElement.previousElementSibling.textContent;
    } else {
      console.log("TRY AGAIN!");
    }
  }
}
document.addEventListener("DOMContentLoaded", saveFavorites);
