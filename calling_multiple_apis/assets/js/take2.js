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
            throw new Error("There was a problem");
        }
        return result.json();
    }).then(function (idData) {
        return fetch("http://localhost:8080/user_by_id?id=" + idData.id);
    }).then(function (result) {
        if (!result.ok) {
            throw new Error("There was a problem");
        }
        return result.json();
    }).then(function(userData) {
        processUser(userData);
    });
}

function processUser(user) {
    console.log(user);
}

getUserByName(name);