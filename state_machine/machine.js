const { STATES } = require("./constants");

const PLAYER_HEARD = 10;
const PLAYER_SEEN = 5;
const PLAYER_CAUGHT = 1;

function stateMachine(object, context) {
    const { distanceToPlayer } = context;

    if (object.state === STATES.SCOUT) {
        if (distanceToPlayer < PLAYER_SEEN) {
            return STATES.CHASE;
        } else if (distanceToPlayer < PLAYER_HEARD) {
            return STATES.TRACK;
        }
    } else if (object.state === STATES.CHASE) {
        if (distanceToPlayer >= PLAYER_SEEN) {
            return STATES.TRACK;
        } else if (distanceToPlayer < PLAYER_CAUGHT) {
            return STATES.FIGHT;
        }
    } else if (object.state === STATES.TRACK) {
        if (distanceToPlayer < PLAYER_SEEN) {
            return STATES.CHASE;
        }
    }

    return object.state;
}

module.exports = stateMachine;