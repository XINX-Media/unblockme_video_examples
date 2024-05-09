const inquirer = require('inquirer');

const connection = require('./connect');

async function getUsers() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM users", (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

getUsers().then((users) => {
    // use users list to generate a list of users to choose from
    inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: "Select user id to lookup",
            choices: users.map((user) => {
                return {
                    name: user.username,
                    value: user.id,
                };
            }),
        }
    ]).then((response) => {
        // look up the user by id
        connection.query(
            'SELECT * FROM users WHERE id = ?',
            [response.id],
            (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.table(results);
                process.exit(0);
            }
        );
    });
});