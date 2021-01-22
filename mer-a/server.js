// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');

var Legende = require('./class/Legende.js')

var app = express();

const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

// open database in memory
let db = null;
(async () => {
  db = await open({filename: './db/database.db', driver: sqlite3.Database});
})()

app.use(`/api/:region/:typeHistoire`, async (req, res) => {
    var legendes = [];
    var sql = `SELECT * FROM Legende 
                WHERE departement = "${encodeURI(req.params.region)}"
                AND categorie = "${encodeURI(req.params.typeHistoire)}"`;
    console.log(sql);

    const rows = await db.all(sql, []);  
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
    res.status(200)
    res.json({data:legendes});
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
app.listen(8080);
//module.exports = app;