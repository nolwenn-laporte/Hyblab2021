// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const config = require('./server/config.js');

console.log(config);

var Legende = require('./server/classes/Legende.js');

var app = express();


// open database
let db = null;
(async () => {
  db = await open({filename: config.DB_PATH, driver: sqlite3.Database});
})()

app.use(`${config.API_URL}:region/:typeHistoire`, async (req, res) => {
    var legendes = [];
    var sql = `SELECT * FROM Legende 
                WHERE departement = "${encodeURI(req.params.region)}"
                AND categorie = "${encodeURI(req.params.typeHistoire)}"`;
    console.log(sql);

    const rows = await db.all(sql, []);  
    rows.forEach((row) => {
        var legende = new Legende(
            decodeURI(row.nom), 
            decodeURI(row.departement), 
            decodeURI(row.categorie), 
            decodeURI(row.resume), 
            decodeURI(row.histoire), 
            row.latitude, 
            row.longitude, 
            decodeURI(row.adresse),
            (row.baignade === 1 ? true : false), 
            (row.toilettes === 1 ? true : false), 
            (row.restaurant === 1 ? true : false), 
            decodeURI(row.photo));
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