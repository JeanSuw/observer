const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const menu = [
    {
    name: 'mainMenu',
    type: 'list',
    message: `Hi! Wecome to Observer. What would you like to do today?`,
    choices: ['View all Departments', 'View all roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an employee role', 'quit'],
    default: 'Move up and down using error to view more'
    },
    {
      name: '',
      type: '',
      message: ``,
      default: ''
    }
];

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER, // root?
    database: 'company_db',
    password: process.env.DB_PASSWORD
});

function viewAllDepartment() {
  // Show department
  // id | department_name 
}

function viewAllRoles () {
  // Show roles
  // id | title | Department | Salary
}

function viewAllEmployee () {
  // show employee database
  // id |first_name|last_name|title|department|salary|manager
}

function addDepartment() {
  // prompted to enter the name of the department and that department is added to the database
  const askDeptName = [{
    type: 'input',
    message: 'What is the name of the department?',
    name: 'addDept',
  }];

  inquirer.prompt(askDeptName)
  .then((answers) => {
    // Create a query to insert new name for a department
    var query = `INSERT INTO department`;

  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      // Something else went wrong
      console.log("Check method in addDepartment()");
    }
    });

}

function addRoles() {
  // prompted to enter the name, salary, and department for the role and that role is added to the database

}

function addEmployee() {
  // prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

}

// Update exisiting employee's info
function updateEmployee(params) {
  //  prompted to select an employee to update and their new role and this information is updated in the database
  
}


inquirer.prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      // Something else went wrong
      console.log("One of the method is not working. Check one of them");
    }
    });