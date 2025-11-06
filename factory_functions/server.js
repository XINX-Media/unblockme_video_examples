const factory = require("./factory");

const inst = factory("a", 5);
const inst2 = factory("b", 5);

inst.print();
inst2.print();