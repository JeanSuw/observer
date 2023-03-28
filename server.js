const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
require('dotenv').config();

const menu = [
    {
    name: 'homepage',
    type: 'list',
    message: `What would you like to do today?`,
    choices: ['View all Departments', 'View all roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an employee role', 'quit'],
    default: 'Move up and down using error to view more'
    },
];

const connection = mysql.createConnection({
    host: process.env.DB_USER,
    user: 'root',
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
});

connection.connect(function (err) {
  if (err) console.log(err);
  console.log('Hi! Wecome to Observer.');
  mainMenu();
});

function mainMenu(){
  inquirer.prompt(menu)
  .then((answers) => {
    switch(answers.homepage) {
      case 'View all Departments':
        viewAllDepartment();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all Employees':
        viewAllEmployee();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRoles();
        break; 
      case 'Add an Employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployee();
        break;
      case 'quit':
        console.log("Bye");
        return connection.end();
    } 
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      // Something else went wrong
      console.log("Check one of the method in mainMenu");
    }});
}

function viewAllDepartment() {
  var queryText = `SELECT * FROM department`;
  connection.query(queryText, (err, res) => {
    console.log(`\nViewing all department:\n`);
    console.table(res);
    mainMenu();
  });
}

function viewAllRoles () {
  var queryText = `SELECT role.id, role.title, role.salary, department.department_name FROM department INNER JOIN role ON department.id=role.department_id`;
  connection.query(queryText, (err, res) => {
    console.log(`\nViewing all roles:\n`);
    console.table(res);
    mainMenu();
  });
}

function viewAllEmployee() {
  var queryText = `SELECT employee.id, employee.first_name, employee.last_name, role.title, employee.manager_id FROM role INNER JOIN employee ON role.id=employee.role_id;`;
  connection.query(queryText, (err, res) => {
    console.log("\nViewing all employees:\n");
    console.table(res);
    mainMenu();
  });
}

function addDepartment() {
  // prompted to enter the name of the department and that department is added to the database
  const askDeptName = [{
    type: 'input',
    message: 'What is the name of the department?',
    name: 'newDept',
  }];

  inquirer.prompt(askDeptName)
  .then((answers) => {
    // Create a query to insert new name for a department
    var queryText = `INSERT INTO department (department_name) VALUE (?)`;
    connection.query(queryText, [answers.newDept] , function (err, res) {
      console.log(`Your response, ${answers.newDept}, is added to the database. See 'View all Department' to see the update`);
      mainMenu();
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Check method in addDepartment()");
    }
  });
}

function addRoles() {
  // prompted to enter the name, salary, and department for the role and that role is added to the database
  const roleQuestion = [{
    name: '',
    type: '',
    message: ``,
    default: ''
  }];
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

}

function addEmployee() {
  // prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
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

}

// Update exisiting employee's info
function updateEmployee() {
  //  prompted to select an employee to update and their new role and this information is updated in the database
  
}


