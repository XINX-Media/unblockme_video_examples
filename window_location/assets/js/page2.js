var timerHeader = document.querySelector('.timer_header');
var timerButton = document.querySelector('.timer_button');

timerButton.addEventListener('click', function() {
    var time = 5;
    timerHeader.textContent = "Navigating programmatically in "+time;
    var interval = setInterval(function() {
        time--;
        timerHeader.textContent = "Navigating programmatically in "+time;
        if (time === 0) {
            clearInterval(interval);
            window.location.assign('./index.html');
        }
    }, 1000);
})