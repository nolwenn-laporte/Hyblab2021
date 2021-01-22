// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');

var Legende = require('./class/Legende.js')

var app = express();

const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('./mer-a/db/database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
  console.log(encodeURI('https://127.0.0.1:8080/mer-a/Morbihan/Créatures Fantastiques'));
});

app.use(`/:region/:typeHistoire`, (req, res) => {
    console.log('Coucou');
    var legendes = [];
    var sql = `SELECT * FROM Legende 
                WHERE departement = "${encodeURI(req.params.region)}"
                AND categorie = "${encodeURI(req.params.typeHistoire)}"`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        
        rows.forEach((row) => {
            console.log(decodeURI(row.nom));
            var legende = new Legende(
                row.nom, 
                row.departement, 
                row.categorie, 
                row.resume, 
                row.histoire, 
                row.latitude, 
                row.longitude, 
                row.adresse,
                row.baignade, 
                row.toilettes, 
                row.restaurant, 
                row.photo);
            legendes.push(legende);
        });
        console.log(legendes);
    });
    res.status(200);
    res.send(legendes);
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