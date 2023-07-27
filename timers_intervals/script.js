var holder = document.getElementById("countdown_holder");
var typingInput = document.getElementById("typingInput");
var userContent = document.getElementById("userContent");

var secondsLeft = 5;

function displaySecondsLeft() {
    holder.innerText = "You have " + secondsLeft + " seconds left!";
}

var myInterval = setInterval(function() {
    secondsLeft --;
    displaySecondsLeft();

    if (secondsLeft <= 0) {
        clearInterval(myInterval);
        holder.innerText = "Time's up!";
    }
}, 1000);

displaySecondsLeft();

var searchTimeout;
typingInput.addEventListener("keyup", function(event) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(function() {
        userContent.innerText = event.target.value;
    }, 2000);
});