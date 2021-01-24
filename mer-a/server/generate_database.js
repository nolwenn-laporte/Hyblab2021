const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const csv = require('csv-parser');
const fs = require('fs');

const config = require('./config.js');

let db = null;
(async () => {
  // open database
  db = await open({filename: config.DB_PATH, driver: sqlite3.Database});

  var sqlDepartement = `CREATE TABLE IF NOT EXISTS Departement (
    id INT PRIMARY KEY,
    nomDepartement VARCHAR(50) NOT NULL
);`;

var sqlCategorie = `CREATE TABLE IF NOT EXISTS Categorie (
    id INT PRIMARY KEY,
    nomCategorie VARCHAR(30) NOT NULL
);`;


  // query to create DB if not created
  var sqlLegende = `CREATE TABLE IF NOT EXISTS Legende (
              id INT PRIMARY KEY,
              nom VARCHAR(150) NOT NULL,
              departementId INT NOT NULL,
              categorieId INT NOT NULL,
              resume VARCHAR(250) NOT NULL,
              histoire VARCHAR(1000) NOT NULL,
              latitude DOUBLE NOT NULL,
              longitude DOUBLE NOT NULL,
              adresse VARCHAR(200) NOT NULL,
              baignade BIT NOT NULL DEFAULT 0,
              toilettes BIT NOT NULL DEFAULT 0,
              restaurant BIT NOT NULL DEFAULT 0,
              photo VARCHAR(500),
              FOREIGN KEY (departementId) REFERENCES Departement(id),
              FOREIGN KEY (categorieId) REFERENCES Categorie(id)
          );`;

  // Execute query
  db.run(sqlDepartement);
  db.run(sqlCategorie);
  db.run(sqlLegende);

  // If DB already existed, delete everything
  db.run("DELETE FROM Departement;");
  db.run("DELETE FROM Categorie;");
  db.run("DELETE FROM Legende;");

  var countIdDep = 1;
  var countIdCat = 1;
  var countIdLeg = 1;
  // Fill the DB with the CSV content
  fs.createReadStream('./server/data.csv')
    .pipe(csv())
    .on('data', (row) => {
      var sql = `INSERT INTO Departement VALUES (            
            ${countIdDep}, 
            '${(encodeURI(row.departement)).replace(/'/g, "`")}');
      
                INSERT INTO Categorie VALUES (
              ${countIdCat}, 
              '${(encodeURI(row.categorie)).replace(/'/g, "`")}');
      
                INSERT INTO Legende VALUES (
          ${countIdLeg},
          '${(encodeURI(row.nom)).replace(/'/g, "`")}',
          ${countIdDep},
          ${countIdCat},
          '${(encodeURI(row.resume)).replace(/'/g, "`")}',
          '${(encodeURI(row.histoire)).replace(/'/g, "`")}',
          ${(row.latitude)},
          ${(row.longitude)},
          '${(encodeURI(row.adresse)).replace(/'/g, "`")}',
          ${(row.baignade === 'TRUE' ? 1 : 0)},
          ${(row.toilettes === 'TRUE' ? 1 : 0)},
          ${(row.restaurant === 'TRUE' ? 1 : 0)},
          '${(encodeURI(row.photo)).replace(/'/g, "`")}');`;
      console.log(sql);

      countIdDep++;
      countIdCat++;
      countIdLeg++;

      db.all(sql, [], (err, rows) => {
      if (err) {
      throw err;
      }
      rows.forEach((row) => {
      console.log(row);
      });
      });
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
})()