// GET CODE BLOCK
const getCall = document.getElementById("download-button");
const postLocation = document.getElementById("post");
const print = document.getElementById("bottom");
const myYelpToken = config.YELP_API_TOKEN;
const corsProxy = config.CORS_PROXY;
const yelp_api_url = corsProxy +"https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=43.641883850097656&longitude=-79.38628387451172&radius=8046&limit=5";

function getCallFunction() {
    // CALL YELP API JSON
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + myYelpToken);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    // write an async function
    async function getBusiness() {
        const response = await fetch(yelp_api_url, requestOptions)
        data = await response.json();
        console.log(data);
        const totalResults = data.businesses.length
                
        // If our results are greater than 0, continue
        if (totalResults > 0) {
            // console.log('Here are ' + resultsLimit + ' restaurants near you')
            console.log('We found ' + totalResults + ' businesses')
            // Iterate through the JSON array of 'businesses' returned by API
            $.each(data.businesses, function(i, item){
                // Store each business's object in a variable
                var id = item.id;
                var alias = item.alias;
                var name = item.name;
                var image = item.image_url;
                var isClosed = item.is_closed
                var reviewCount = item.review_count;
                var categoriesAlias = item.categories.alias
                var categoriesTitle = item.categories.title
                var rating = item.rating;
                var coordinates = item.coordinates
                var lat = coordinates.latitude
                var lon = coordinates.longitude
                var price = item.price
                var address = item.location.address1;
                var city = item.location.city;
                var province = item.location.state;
                var postalCode = item.location.zip_code;
                var phone = item.display_phone;
                var distance = item.distance
            })
        } else {
            console.log('We found ' + data.total + ' businesses')
        }

    }
    getBusiness();
}

// HANDLE GET
getCall.addEventListener("click", e=> {
    e.preventDefault();
    e.stopPropagation();
    console.log("User clicked on GET");
    getCallFunction()
})
