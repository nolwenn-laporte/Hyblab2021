async function getLegendes(region, type, callback) {
    //Récupération des données
    let result = (await (await fetchAsync(API_URL + encodeURI(region) + '/' + encodeURI(type), 'GET')).json());
    //transformation des données
    let legendes = [];
    for(let l of result.data) {
        legendes.push(new Legende(l.nom, l.departement, l.categorie, l.resume, l.histoire, l.latitude, l.longitude, l.adresse, l.baignade, l.toilettes, l.restaurant, l.photo));
    }
    //Transmission des données
    callback(legendes);
    return legendes;
}

//Déclaration de la fonction permettant de récupérer le résultat d'une URL
async function fetchAsync(url, method) {
    let options = null;
    if (method) {
        options = {method: method};
    }
    let fetch_res = await fetch(url, options);
    if (fetch_res.ok)
        return fetch_res;
    else {
        if (fetch_res.status === 401) {
            //...
        }
        console.error(await fetch_res.text());
    }
}
