let legendes = null;
//On récupère la promesse dans 'legendesMorbihanFantastique' et on donne une fonction de callback qui va initialiser 'legendes'
let legendesMorbihanFantastique = getLegendes(3, 2, (r) => legendes = r);
//Quand la promesse est finie
legendesMorbihanFantastique.then((s) => {
    //On affiche le contenu de légende et du résultat reçu via 'then'
    console.log(legendes);
    console.log(s);
    //On récupère le conteneur de test
    let box = document.querySelector('#testBox');
    //On ajoute le contenu
    for(let l of s) {
        box.innerHTML += `Legende ${l.nom} :\n${l.histoire}\n`;
    }
}, (r) => console.log(r)); //Ici, fonction en cas d'erreur
//Ces deux lignes s'effectue avant 'then' puisqu'elles n'attendent pas la promesse et donc,
//'legendesMorbihanFantastique' va afficher 'Promise {<pending>}'
console.log(legendesMorbihanFantastique);
//'legendes' va afficher 'null'
console.log(legendes);