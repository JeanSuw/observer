const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const menu = [
    {
    name: 'homepage',
    type: 'list',
    message: `Hi! Wecome to Observer. What would you like to do today?`,
    choices: ['View all Departments', 'View all roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an employee role', 'quit'],
    default: 'Move up and down using error to view more'
    },
];

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER, // root?
    database: 'company_db',
    password: process.env.DB_PASSWORD
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
        console.log("See ya");
        connection.end();
        break;
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      // Something else went wrong
      console.log("Check one of the method in mainMenu");
    }
    });
}

function viewAllDepartment() {
  // Show department
  // id | department_name
  var queryText = `SELECT * FROM department`;
  connection.query(queryText, (err, res) => {
    console.log("Viewing all department");
    console.table(res);
    mainMenu();
  });
}

function viewAllRoles () {
  // Show roles
  // id | title | Department | Salary
  var queryText = `SELECT * FROM role`;
  connection.query(queryText, (err, res) => {
    console.log("Viewing all roles:");
    console.table(res);
    mainMenu();
  });
}

function viewAllEmployee() {
  // show employee database
  // id |first_name|last_name|title|department|salary|manager
  var queryText = `SELECT * FROM employee`;
  connection.query(queryText, (err, res) => {
    console.log("Viewing all employees:");
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
    var queryText = `INSERT INTO department (name) VALUE (?)`;
    connection.query(queryText, [answers.newDept] , (err, res) => {
      console.log(`Your response, ${answers.newDept}, is added to the database`);
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


