const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const menu = [
    {
    type: 'list',
    message: `Hi! Wecome to Observer. What would you like to do today?`,
    choices: ['View All Employee', 'Update Employee Role', 'View All Roles', 'Add Roles', 'View All Department', 'Add Department', 'quit'],
    default: 'Move up and down using error to view more'
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