const Base = require("./baseClass");

class ClassA extends Base {
    constructor(num) {
        super();
        this.num = num;
    }
}

module.exports = ClassA;