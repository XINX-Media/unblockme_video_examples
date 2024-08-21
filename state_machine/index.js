const { STATES } = require("./constants");
const stateMachine = require("./machine");

const object = {
    state: STATES.SCOUT,
};

object.state = stateMachine(object, { distanceToPlayer: 9 });
console.log(object.state);
object.state = stateMachine(object, { distanceToPlayer: 4 });
console.log(object.state);
object.state = stateMachine(object, { distanceToPlayer: 6 });
console.log(object.state);
object.state = stateMachine(object, { distanceToPlayer: 3 });
console.log(object.state);
object.state = stateMachine(object, { distanceToPlayer: 0 });
console.log(object.state);