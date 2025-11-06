const inst = require("./singleton");

function addTwo(num) {
    inst.add(num * 2);
}

module.exports = addTwo;