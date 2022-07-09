
var myUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=timhortons&location=toronto";
// max radius of 25 miles
var myUrlRadius = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?radius=25&location=290 Bremner Blvd, Toronto, ON M5V 3L9";

var myToken = "";

var getUserRepos = function() {
    // format the yelp api url
    // var apiUrl = "api.yelp.com/v3/businesses/search?term=restaurants&radius=25&location=290 Bremner Blvd, Toronto, ON M5V 3L9";
    
    // TODO: TRY AJAX
    $.ajax({
        url: myUrl,
        headers: {
         'Authorization':'Bearer ' + myToken,
     },
        method: 'GET',
        dataType: 'json',
        success: function(data){
            // Grab the results from the API JSON return
            var totalResults = data.total;
            // If our results are greater than 0, continue
            if (totalResults > 0){
                // Display a header on the page with the number of results
                console.log("SUCCESS");
                $('#results').append('<h5>We discovered ' + totalResults + ' results!</h5>');
                // Iterate through the JSON array of 'businesses' which was returned by the API
                $.each(data.businesses, function(i, item) {
                    // Store each business's object in a variable
                    var id = item.id;
                    var alias = item.alias;
                    var phone = item.display_phone;
                    var image = item.image_url;
                    var name = item.name;
                    var rating = item.rating;
                    var reviewCount = item.review_count;
                    var address = item.location.address1;
                    var city = item.location.city;
                    var state = item.location.state;
                    var zipCode = item.location.zip_code;
                    // Append our result into our page
                    $('#results').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipCode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewCount + ' reviews.</div>');
              });
            } else {
                // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
                console.log("Not Successful");
                $('#results').append('<h5>We discovered no results!</h5>');
            }
        }
     });    



    // TODO: TRY FETCH
    // fetch(myUrl, {
    //     method: "GET", 
    //     headers: {
    //         "Authorization": "Bearer " + myToken, 
    //     }})
    // .then(res => {
    //     // check if response is okay
    //     if (res.ok) {
    //         console.log("SUCCESS");
    //     } else {
    //         console.log("Not Successful");
    //     }
    //     res.json()
    // })
    // .then(data => console.log(data));
    
       
}

getUserRepos();

