var buttonElem = document.getElementById("creationButton");
var rowHolderElem = document.querySelector(".rowHolder");

buttonElem.addEventListener("click", function () {
    var newRowElem = document.createElement("div");
    newRowElem.textContent = "This is a new row";

    rowHolderElem.appendChild(newRowElem);

    var allDivs = document.querySelectorAll("div");
    console.log(allDivs);
});