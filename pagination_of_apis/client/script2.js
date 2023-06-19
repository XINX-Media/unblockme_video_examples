var holder = document.getElementById("holder");
var nextBtn = document.getElementById("next_button");
var prevBtn = document.getElementById("prev_button");
var baseApi = "http://localhost:9090";

var page = 0;
var perPage = 3;

// method to get data from the api
function getData() {
    // call the api
    // /v2?page=<page>&page_count=<total on page>
    fetch(baseApi + "/v2?page=" + page + "&page_count=" + perPage).then((response) => {
        return response.json();
    }).then((data) => {
        // clear all existing items from list
        holder.innerHTML = "";

        // loop over responses
        for (var i=0;i<data.length;i++) {
            // get response name
            var item = data[i];
            var name = item.name;

            // create holder for the name
            var nameHolder = document.createElement("h2");
            nameHolder.textContent = name;

            // add name holder to overall holder
            holder.appendChild(nameHolder);
        }
    });
}

getData();

nextBtn.addEventListener("click", function() {
    page ++;
    getData();
});

prevBtn.addEventListener("click", function() {
    page --;
    getData();
});