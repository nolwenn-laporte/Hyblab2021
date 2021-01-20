const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('./db/database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

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

db.run(sql);

var sql = `INSERT INTO Legende VALUES (
    'La Baie des Trépassée',
    'Finistère',
    'Histoires Maritimes',
    'Une plage macabre qui effraie les marrins de toute la Bretagne ...',
    '"En breton on l’appelle Boë an Anao, qui signifie : la « baie des âmes en peine ».
        On raconte que les corps des marins qui avaient perdu la vie en mer venaient s’y échouer.
        Durant la nuit de Noël la baie résonne des chants des âmes en peine ballotées sur le bateau des morts.
        Une autre légende rapporte qu’elle servait de lieu d’embarquement des dépouilles des druides morts vers l’Île de Sein pour leur inhumation."',
    48.04805556,
    4.71472222,
    'Cléden-Cap-Sizun 29770',
    1,
    0,
    1,
    'https://fr.wikipedia.org/wiki/Baie_des_Tr%C3%A9pass%C3%A9s#/media/Fichier:Baie_des_Tr%C3%A9pass%C3%A9s.jpg')`;

db.all(sql, [], (err, rows) => {
if (err) {
throw err;
}
rows.forEach((row) => {
console.log(row);
});
});