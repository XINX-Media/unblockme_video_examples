const Base = require("./baseClass");

class ClassB extends Base {
    constructor(num) {
        super();
        this.num = num * 2;
    }
}

module.exports = ClassB;