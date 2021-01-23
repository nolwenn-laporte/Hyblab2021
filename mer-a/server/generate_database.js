const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const csv = require('csv-parser');
const fs = require('fs');

let db = null;
(async () => {
  // open database
  db = await open({filename: config.DB_PATH, driver: sqlite3.Database});

  // query to create DB if not created
  var sql = `CREATE TABLE IF NOT EXISTS Legende (
              id INT PRIMARY KEY,
              nom VARCHAR(150) NOT NULL,
              departement VARCHAR(50) NOT NULL,
              categorie VARCHAR(30) NOT NULL,
              resume VARCHAR(250) NOT NULL,
              histoire VARCHAR(1000) NOT NULL,
              latitude DOUBLE NOT NULL,
              longitude DOUBLE NOT NULL,
              adresse VARCHAR(200) NOT NULL,
              baignade BIT NOT NULL DEFAULT 0,
              toilettes BIT NOT NULL DEFAULT 0,
              restaurant BIT NOT NULL DEFAULT 0,
              photo VARCHAR(500)
          );`;

  // Execute query
  db.run(sql);

  // If DB already existed, delete everything
  db.run("DELETE FROM Legende;");

  // Fill the DB with the CSV content
  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
      var sql = `INSERT INTO Legende VALUES (
          '${(encodeURI(row.nom)).replace(/'/g, "`")}',
          '${(encodeURI(row.departement)).replace(/'/g, "`")}',
          '${(encodeURI(row.categorie)).replace(/'/g, "`")}',
          '${(encodeURI(row.resume)).replace(/'/g, "`")}',
          '${(encodeURI(row.histoire)).replace(/'/g, "`")}',
          ${(row.latitude)},
          ${(row.longitude)},
          '${(encodeURI(row.adresse)).replace(/'/g, "`")}',
          ${(row.baignade === 'TRUE' ? 1 : 0)},
          ${(row.toilettes === 'TRUE' ? 1 : 0)},
          ${(row.restaurant === 'TRUE' ? 1 : 0)},
          '${(encodeURI(row.photo)).replace(/'/g, "`")}')`;
      console.log(sql);
      
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