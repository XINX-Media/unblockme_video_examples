const inquirer = require('inquirer');

const connection = require('./connect');

inquirer.prompt([
    {
        type: 'input',
        name: 'id',
        message: "Enter user id to lookup"
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