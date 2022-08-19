const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "boilerplate",
})

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected");
});

module.exports = connection
