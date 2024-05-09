const inquirer = require('inquirer');

const connection = require('./connect');

inquirer.prompt([
    {
        type: 'input',
        name: 'username',
        message: "Enter username to lookup"
    }
]).then((response) => {
    // look up the user by username
    connection.query(
        'SELECT * FROM users WHERE username = ?',
        [response.username],
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