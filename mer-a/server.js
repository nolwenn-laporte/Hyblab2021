// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

// Load server CONFIG variables
const config = require('./server/config.js');
console.log(config);

// Load useful classes
var Legende = require('./server/classes/Legende.js');

// Create the application object
var app = express();


// open database
let db = null;
(async () => {
  db = await open({filename: config.DB_PATH, driver: sqlite3.Database});
})();


app.get(`${config.API_URL}all/regions`, async (req, res) => {
  let sql = 'SELECT * FROM DEPARTEMENT;'
  const rows = await db.all(sql, []);
  console.log(rows);
  res.status(200).json(rows);
});

app.get(`${config.API_URL}all/types`, async (req, res) => {
  let sql = 'SELECT * FROM CATEGORIE;'
  const rows = await db.all(sql, []);
  console.log(rows);
  res.status(200).json(rows);
});

// Add route to get the legends
app.get(`${config.API_URL}:region/:typeHistoire`, async (req, res) => {
    // Declaration of the variables
    var legendes = [];
    var sql = `SELECT * FROM Legende INNER JOIN Departement ON Departement.id = departementId
                INNER JOIN Categorie ON Categorie.id = categorieId WHERE departementId = ?
                AND categorieId = ?;`;
    console.log(sql + `\ndep: "${req.params.region}",\ncat: "${req.params.typeHistoire}"`);

    // Get the query result
    const rows = await db.all(sql, [encodeURI(req.params.region), encodeURI(req.params.typeHistoire)]);
    // Process the query result
    rows.forEach((row) => {
        var legende = new Legende(
            decodeURI(row.nom), 
            decodeURI(row.nomDepartement), //A modifier
            decodeURI(row.nomCategorie),   //A modifier
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
    // Show and send processed query result
    console.log(legendes);
    res.status(200);
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

// Pour lancer depuis mer-a (npm start)
app.listen(8080);

//Pour lancer depuis Hyblab2021 / racine (npm start)
//module.exports = app;