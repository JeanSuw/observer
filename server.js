const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
require('dotenv').config();
var deptOption = [];
var roleOption = [];
var managerOpt = [];
var employeeOpt = [];
var employeeUpdateOpt = [];

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
        updateEmployee1();
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

// Salary?
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
  var queryText = `SELECT * FROM department`;
  connection.query(queryText, (err, res) => {
    for(var i = 0; i < res.length; i ++){
      deptOption.push(res[i].department_name);
      //console.log(`${res[i].id} | ${res[i].department_name}`);
    }
    //console.log(deptOption);
  });
  // prompted to enter the name, salary, and department for the role and that role is added to the database
  const roleQuestions = [
    {
    name: 'newRole',
    type: 'input',
    message: `What is the name of the role?`,
    default: 'Type something'
    },
    {
      name: 'newSalary',
      type: 'input',
      message: `What is the salary of the role?`,
      default: 'Insert numbers only. No dollar symbols'
    },
    {
      name: 'pickedDepartment',
      type: 'list',
      message: `Which department does the role belong to?`,
      choices: deptOption,
      default: 'Pick one using up and down key'
    }
  ];

  inquirer.prompt(roleQuestions)
  .then((answers) => {
    var queryText = `INSERT INTO role(title,salary,department_id) VALUES  (?,?,?)`;
    var index = deptOption.indexOf(answers.pickedDepartment)+1;
    connection.query(queryText, [answers.newRole, answers.newSalary, index] , function (err, res) {
      mainMenu();
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Check addRoles to check which one of the method is not working");
    }
    });

}

function addEmployee() {
  // prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
  var queryText = `SELECT role.title FROM role INNER JOIN employee ON role.id=employee.role_id`;
  connection.query(queryText, (err, res) => {
    for(var i = 0; i < res.length; i ++){
      roleOption.push(res[i].title);
    }
  });
  queryText = `SELECT manager_id FROM employee`;
  connection.query(queryText, (err, res) => {
    for(var i = 0; i < res.length; i ++){
      if (res[i].manager_id !== null){
        managerOpt.push(res[i].manager_id);
      }
    }
    managerOpt.push("Null");
  });
  console.log(`Check roles: ${roleOption}`);
  console.log(`Check manager ${managerOpt}`);
  const empQuestions = [
    {
    name: 'firstName',
    type: 'input',
    message: `What is his/her/their first name?`,
    },
    {
      name: 'lastName',
      type: 'input',
      message: `What is his/her/their last name?`,
    },
    {
      name: 'role',
      type: 'list',
      message: `What is his/her/their role?`,
      choices: roleOption,
      default: 'Pick one using up and down key'
    },
    {
      name: 'manager',
      type: 'list',
      message: `Who is the employee's manager?`,
      choices: managerOpt,
      default: 'Pick null if there is no manager'
    }
  ];
  
  inquirer.prompt(empQuestions)
  .then((answers) => {
    var queryText = `INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES  (?,?,?,?)`;
    var index = roleOption.indexOf(answers.role)+1;
    var managerIndex;
      if (answers.manager === "Null"){
        managerIndex = null;
      }else{
        managerIndex = answers.manager;
      }
    connection.query(queryText, [answers.firstName, answers.lastName, index, managerIndex] , function (err, res) {
      console.log(`Check view all employee`);
      // Reset the choices to avoid stackoverflow
      roleOption = [];
      managerOpt =[]; 
      mainMenu();
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Check addEmployee function.");
    }
  });
}

// Update exisiting employee's info
// Not working
function updateEmployee() {
  var refList = [];
  //  prompted to select an employee to update and their new role and this information is updated in the database
  var queryText = `SELECT * FROM employee`;
  connection.query(queryText, function (err, res) {
    for(var i = 0; i < res.length; i ++){
      var toString = `${res[i].first_name} ${res[i].last_name}`;
      refList.push(0);
    }
  });
  //console.log("refList" + refList);
  console.log("Check refList" + refList);

  var queryText = `SELECT role.title FROM role INNER JOIN employee ON role.id=employee.role_id`;
  connection.query(queryText, (err, res) => {
    for(var i = 0; i < res.length; i ++){
      roleOption.push(`${res[i].title}`);
    }
  });

  const askToUpdate = [
    {
      type: 'list',
      message: `Which employee's role do you want to update?`,
      choices: employeeOpt,
      name: 'updateEmp',
    },
    {
      type: 'list',
      message: `Which role do you want to assign the selected employee?`,
      choices: roleOption,
      name: 'updateEmpRole',
    }
  ];

  inquirer.prompt(askToUpdate)
  .then((answers) => {
    // Create a query to insert new name for a department
    queryText = `UPDATE employee SET role_id = ? WHERE id = ? `;
    var empID = isExist(answers.updateEmp,refList);
    connection.query(queryText, [answers.updateEmpRole, empID] , function (err, res) {
      console.log(`The employee's role has been updated. check view all employee option`);
      // Reset option lists to avoid stackoverflow
      employeeOpt = [];
      roleOption = [];
      refList = [];
      mainMenu();
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Check method in update employee");
    }
  });
   
}
// Not working
function updateEmployee1(){
  var queryText = `SELECT employee.first_name, employee.last_name FROM employee`;
  connection.query(queryText, (err, res) => {
    for(var i = 0; i < res.length; i ++){
      employeeUpdateOpt.push(res[i].first_name);
    }
  });

  var queryText = `SELECT role.title FROM role INNER JOIN employee ON role.id=employee.role_id`;
  connection.query(queryText, (err, res) => {
    for(var i = 0; i < res.length; i ++){
      roleOption.push(res[i].title);
    }
    console.log(roleOption);
  });

  const askToUpdate = [
    {
      name: 'updateEmp',
      type: 'list',
      message: `Which employee's role do you want to update?`,
      choices:  employeeUpdateOpt[0],
      default: 'Press up and down to navigate'
      
    },
    {
      name: 'updateEmpRole',
      type: 'list',
      message: `Which role do you want to assign the selected employee?`,
      choices: roleOption,
      default: 'Press up and down to navigate'
    },
  ];
  inquirer.prompt(askToUpdate)
  .then((answers) => {
    console.log('YOu select employee: '+ answers.updateEmp);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Check method in update employee");
    }
  });

}

function isExist(fullName, nameList){
  for(var k = 0; k < nameList.length; k++){
    if (fullName === nameList[k].fullName){
      // Return id
      return nameList[k].id;
    }
  }
}