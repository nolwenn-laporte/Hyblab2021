async function getLegendes(region, type, callback) {
    let legendes = (await (await fetchAsync(API_URL + encodeURI(region) + '/' + encodeURI(type))).json());
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
