const validator = require("validator");

const string = "blah@blah.com";

const isEmail = validator.isEmail(string);

console.log(string + " is email? " + isEmail);