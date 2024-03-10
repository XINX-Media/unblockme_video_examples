var apiKey = '<your api key here>'; // Replace with your actual Giphy API key
var searchFormEl = document.getElementById('search-form');
var resultsEl = document.getElementById('result');
resultsEl.style.display = 'none';
var imageEl = document.getElementById('image');
var alertEl = document.getElementById('alert');
alertEl.style.display = 'none';
    //set up event listener for search form and define the functionality that occurs on submit
    searchFormEl.addEventListener('submit', function(event) {
        event.preventDefault();

        //get the search term from the user
        var searchTerm = document.getElementById('search-input').value;

        //add search term and api key to the giphy api url
        var apiUrl = 'https://api.giphy.com/v1/gifs/search?q='+searchTerm+'&api_key='+apiKey+''

        //fetch request
        fetch(apiUrl)
        .then(response => {
            //if we get a bad response
            if (!response.ok) {
                //let me know
                console.log('HTTP error! Status: ' + response.status);
            }
            //convert response to json
            return response.json();
        })
        .then(data => {
            // Handle the response data here
            //if our data is an empty aray
            if(data.data.length === 0){
                //hide the card
                resultsEl.style.display = 'none'; 
                //show me a dismissable alert
                alertEl.style.display = 'block';
                return;
            }else{
                //otherwise, console log data
                console.log(data)
                //reveal the card
                resultsEl.style.display = 'block';
                //set the image's src attribute to the appropriate url from our response
                imageEl.setAttribute('src', data.data[0].images.original.webp);
                //set the anchor tag's href attribute to the appropriate url from our response
                document.getElementById('link').setAttribute('href', data.data[0].url)
            }
    
        })
        .catch(error => {
            // Handle errors here
            console.error('Fetch error:', error);
        });
        
    });

