const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const questions = [
    {
    type: 'list',
    message: ``,
    choices: ['something', 'anotherthing'],
    default: ''
    },
];

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
});


inquirer.prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("");
    } else {
      // Something else went wrong
      console.log("One of the method is not working. Check one of them");
    }
    });