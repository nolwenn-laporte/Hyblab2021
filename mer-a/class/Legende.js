class Legende {

    constructor(
        nom, 
        departement, 
        categorie, 
        resume, 
        histoire, 
        latitude, 
        longitude,
        adresse,
        baignade,
        toilettes, 
        restaurant, 
        photo) {

            this.nom = decodeURI(nom);
            this.departement = decodeURI(departement);
            this.categorie = decodeURI(categorie);
            this.resume = decodeURI(resume);
            this.histoire = decodeURI(histoire);
            this.latitude = decodeURI(latitude);
            this.longitude = decodeURI(longitude);
            this.adresse = decodeURI(adresse);
            this.baignade = decodeURI(baignade);
            this.toilettes = decodeURI(toilettes);
            this.restaurant = decodeURI(restaurant);
            this.photo = decodeURI(photo);
    }
}

module.exports = Legende;