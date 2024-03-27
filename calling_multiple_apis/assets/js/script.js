/*
GET /user_id_by_name?name=Bob
Expects a name as a query parameter
Returns an ID

GET /user_by_id?id=5
Expects an id as a query parameter
Returns a User
*/

const name = "Bob";

function getUserByName(name) {
    fetch("http://localhost:8080/user_id_by_name?name=" + name).then(function(result) {
        if (!result.ok) {
            console.error("There was a problem");
        } else {
            result.json().then(function(idData) {
                getUserById(idData.id);
            });
        }
    })
}

function getUserById(id) {
    fetch("http://localhost:8080/user_by_id?id=" + id).then(function(result) {
        if (!result.ok) {
            console.error("There was a problem");
        } else {
            result.json().then(function(userData) {
                processUser(userData);
            });
        }
    });
}

function processUser(user) {
    console.log(user);
}

getUserByName(name);