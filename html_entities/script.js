var search = new URLSearchParams(document.location.search);
const password = search.get("password");

var testString = "hello?&bye=";
var encoded = encodeURIComponent(testString);
var decoded = decodeURIComponent(encoded);

console.log(encoded);
console.log(decoded);

if (password === "hello?&bye=") {
    document.getElementById("math").style.display = "block";
}

/*
html_entities/index.html?password=hello%3F%26bye%3D

html_entities/index.html?password=hello?&bye=

? => %3F
& => %26
= => %3D
% => %25
SPACE => %20
*/