document.getElementById("buttonElem").addEventListener("click", function() {
    var name = document.getElementById("nameHolder").value;

    var nameListString = localStorage.getItem("nameList");
    var previousNameList = JSON.parse(nameListString);
    if (previousNameList === null) {
        previousNameList = [];
    }

    previousNameList.push({
        name: name
    });
    var listAsString = JSON.stringify(previousNameList);
    localStorage.setItem("nameList", listAsString);
});

var nameListString = localStorage.getItem("nameList");
var previousNameList = JSON.parse(nameListString);
var holder = document.getElementById("previousNameHolder");

if (previousNameList) {
    for (var i=0;i<previousNameList.length;i++) {
        var previousName = previousNameList[i];

        var nameHolder = document.createElement("div");
        nameHolder.textContent = previousName.name;
        holder.appendChild(nameHolder);
    }
}