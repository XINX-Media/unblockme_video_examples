$("#my_form").on("submit", function(event) {
    event.preventDefault();

    var name = $("#name_holder").val();

    alert("Your name is " + name);
});

$("section button").on("click", function() {
    var dataNumber = $(this).attr("data-number");

    console.log(dataNumber);
});

$("section").on("click", "button", function() {
    var dataNumber = $(this).attr("data-number");

    console.log(dataNumber);
});
