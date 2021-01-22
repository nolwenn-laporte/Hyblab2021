// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');

var app = express();

const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('./db/database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');

  var sql = `SELECT * FROM Legende WHERE departement = 'Morbihan'`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(rows.length);
        rows.forEach((row) => {
            console.log(decodeURI(row.nom));
        });
    });
});

app.use(`/:region/:typeHistoire`, (req, res) => {
    
    var sql = `SELECT * FROM Legende 
                WHERE departement = ${req.params.region} 
                AND categorie = ${req.params.typeHistoire}`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(decodeURI(row.nom));
        });
    });
    res.status(200);
});


// close the database connection
/*db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});*/

// Minimum routing: serve static content from the html directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

// You can then add whatever routing code you need

// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = app;