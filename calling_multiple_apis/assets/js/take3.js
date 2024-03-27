/*
GET /user_id_by_name?name=Bob
Expects a name as a query parameter
Returns an ID

GET /user_by_id?id=5
Expects an id as a query parameter
Returns a User
*/

const name = "Bob";

async function getUserByName(name) {
    let result = await fetch("http://localhost:8080/user_id_by_name?name=" + name)
    if (!result.ok) {
        throw new Error("There was a problem");
    }
    const idData = await result.json();

    result = await fetch("http://localhost:8080/user_by_id?id=" + idData.id);
    if (!result.ok) {
        throw new Error("There was a problem");
    }
    const userData = await result.json();
    
    processUser(userData);
}

function processUser(user) {
    console.log(user);
}

getUserByName(name);