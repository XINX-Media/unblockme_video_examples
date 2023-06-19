var holder = document.getElementById("holder");
var nextBtn = document.getElementById("next_button");
var prevBtn = document.getElementById("prev_button");
var baseApi = "http://localhost:9090";

var page = 0;
var perPage = 5;
var apiResponse = [];

// method to get data from the api
function getData() {
    // call the api
    fetch(baseApi + "/v1").then((response) => {
        return response.json();
    }).then((data) => {
        apiResponse = data;
        generateList();
    });
}

function generateList() {
    // clear all existing items from list
    holder.innerHTML = "";

    var min = page * perPage;
    var max = min + perPage;

    // loop over responses
    for (var i=min;i<Math.min(apiResponse.length, max);i++) {
        // get response name
        var item = apiResponse[i];
        var name = item.name;

        // create holder for the name
        var nameHolder = document.createElement("h2");
        nameHolder.textContent = name;

        // add name holder to overall holder
        holder.appendChild(nameHolder);
    }
}

getData();

nextBtn.addEventListener("click", function() {
    page ++;
    generateList();
});

prevBtn.addEventListener("click", function() {
    page --;
    generateList();
});