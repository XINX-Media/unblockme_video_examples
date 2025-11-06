const inst = require("./singleton");
const addTwo = require("./file2");

inst.doThing();
inst.add(5);
inst.doThing();
addTwo(20);
inst.doThing();

function someAction(obj, num) {
    obj.add(num);
}

someAction(inst, 10);