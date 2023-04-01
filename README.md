# [Observer](#table-of-content)
## [Description](#table-of-content)
The content management systems (CMS) for the non-developer managers to view and interact with information stored in company's employee databases.

## Table of Content
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)

## [Installation](#table-of-content)
This application is build from scratch. It requires Node.js, Inquirer, and MySQL to manage employee database.


```bash
npm init -y
// To install inquirer, use these steps
npm i inquirer@8.2.4

// To install console table
npm i console.table

// To install mysql
npm i mysql2
```

## [Usage](#table-of-content)
You must use command-line to navigate the database.
Before navigating to main menu to view employee's database, you must type in the following commands to get database.

```bash
mysql -u root -p
// It will ask you to enter the sql password

// Once you enter sql password you can type in these two command one line at a time
source db/schema.sql
source db/seeds.sql
// Once you are done, you can type "quit".
quit
```

Once you enter the starter data into the table, you can run this command to view the databash

```
npm start
// or
node server.js
```

This walkthrough video will show you how to use Observer database.
* [] ()



## [Credits](#table-of-content)
Without these guidances, my website would not exist.

Packages tutorials
* [Node MySQL 2](https://www.npmjs.com/package/mysql2)
* [Inquirer.js](https://www.npmjs.com/package/inquirer/v/8.2.4)
* [console.table](https://www.npmjs.com/package/console.table)

Tutorials from Bootcamp course files
* 15-Ins_Schema
* 19-Ins_Foreign-Primary-Key
* [MySql: How to insert data](https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp)
* [SQL: INSERT INTO Statement](https://www.w3schools.com/sql/sql_insert.asp)
* [SQL: Insert to query](https://stackoverflow.com/questions/49487104/mysql2-inserting-values-nodejs)
* [How to end sql?](https://stackoverflow.com/questions/19563474/how-to-close-database-connection-in-node-js)
* [Console.table: More examples](https://developer.mozilla.org/en-US/docs/Web/API/console/table)
* [Can a foreign key reference multiple tables?](https://www.quora.com/Can-a-foreign-key-reference-multiple-tables)
* [A foreign key reference multiple tables examples](https://www.sqlservercentral.com/forums/topic/foreign-key-references-multiple-tables)
* [mysql ECONNREFUSED](https://stackoverflow.com/questions/30266221/node-js-mysql-error-connect-econnrefused)
* [JOIN IN](https://dba.stackexchange.com/questions/129023/selecting-data-from-another-table-using-a-foreign-key)
* [Update sql](https://www.w3schools.com/sql/sql_update.asp)
* [Random name generator](https://randomwordgenerator.com/name.php)

[Return back to Title](#observer)