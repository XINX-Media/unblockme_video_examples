var myDiv = $(".blah");
var myOtherDiv = $("#mydiv");
var mySection = $("section");

myDiv.text("div1");
myOtherDiv.text("div2");
mySection.text("my section");

var mySpan = $("<span style='color: red;'>my span</span>");

$("body").append(mySpan);

myDiv.attr("data-foo", "blah");

var attribute = myDiv.attr("data-foo");
console.log(attribute);

myOtherDiv.css("background-color", "red");