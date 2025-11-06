const ClassA = require("./classa");
const ClassB = require("./classb");

function classFactory(type, num) {
    if (type === "a") {
        return new ClassA(num);
    } else if (type === "b") {
        return new ClassB(num);
    }
}

module.exports = classFactory;