
var timerHeader = document.querySelector('.timer_header');
var timerButton = document.querySelector('.timer_button');

var searchForm = document.getElementById('search_form');
var input1 = document.getElementById('search_input1')
var input2 = document.getElementById('search_input2')

timerButton.addEventListener('click', function() {
    var time = 5;
    timerHeader.textContent = "Navigating programmatically in "+time;
    var interval = setInterval(function() {
        time--;
        timerHeader.textContent = "Navigating programmatically in "+time;
        if (time === 0) {
            clearInterval(interval);
            window.location.assign('./page2.html');
        }
    }, 1000);
})

searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    var userInput1 = input1.value;
    var userInput2 = input2.value
    
    //creating query parameters (unencoded)
    
    var url = './searchPage.html?searchterm1=' + userInput1 + '&searchterm2=' + userInput2;

    //creating query parameters (encoded) 

    // var encodedInput1 = encodeURIComponent(userInput1);
    // var encodedInput2 = encodeURIComponent(userInput2);
    // var url = './searchPage.html?searchterm1=' + encodedInput1 + '&searchterm2=' + encodedInput2;

    window.location.assign(url);
});
