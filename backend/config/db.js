const mysql = require("mysql2");

const connection = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "praveen@2005",

    database: "smart_retail"

});

connection.connect((err) => {

    if (err) {

        console.log(err);

    } else {

        console.log("MySQL Connected");

    }

});

module.exports = connection;