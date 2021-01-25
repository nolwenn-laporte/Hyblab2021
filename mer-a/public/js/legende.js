'use strict';

(() => {
	const data = {
		nom: 'La Baie des Trépassés', 
    departement: 'Finistère', 
    categorie: 'Histoires Maritimes', 
    resume: 'Une plage macabre qui effraie les marrins de toute la Bretagne ...', 
    histoire: `En breton on l’appelle Boë an Anao, qui signifie : la « baie des âmes en peine ». On raconte que les corps des marins qui avaient perdu la vie en mer venaient s’y échouer. Durant la nuit de Noël la baie résonne des chants des âmes en peine ballotées sur le bateau des morts. Une autre légende rapporte qu’elle servait de lieu d’embarquement des dépouilles des druides morts vers l’Île de Sein pour leur inhumation.
    En breton on l’appelle Boë an Anao, qui signifie : la « baie des âmes en peine ». On raconte que les corps des marins qui avaient perdu la vie en mer venaient s’y échouer. Durant la nuit de Noël la baie résonne des chants des âmes en peine ballotées sur le bateau des morts. Une autre légende rapporte qu’elle servait de lieu d’embarquement des dépouilles des druides morts vers l’Île de Sein pour leur inhumation.`,

    latitude: '48.04730', 
    longitude: '-4.70676',
    adresse: 'Cléden-Cap-Sizun 29770',
    baignade: true,
    toilettes: false, 
    restaurant: true, 
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Baie_des_Tr%C3%A9pass%C3%A9s.jpg/1920px-Baie_des_Tr%C3%A9pass%C3%A9s.jpg'
	};

	document.querySelector('#nom').innerHTML = data.nom;
	document.querySelector('#department').innerHTML = data.departement;
	document.querySelector('div#bubble').innerHTML = data.histoire;
	document.querySelector('#categorie').innerHTML = data.categorie;
	document.querySelector('#adresse').innerHTML = data.adresse;
	document.querySelector('#photo').src = data.photo;
	document.querySelector('#googlemaps').addEventListener('click', (event) => {
		const url = `https://maps.google.com/?q=${data.latitude},${data.longitude}`;
		window.open(url, '_blank');
	});
	initLogo('wc', 'toilettes', data.toilettes);
	initLogo('swim', 'baignade', data.baignade);
	initLogo('food', 'restaurant', data.restaurant);

	function initLogo(id, alt, boolean) {
		const logo = document.querySelector(`#${id}`);
		logo.alt = (boolean) ? alt : `pas de ${alt}`;
		logo.src = (boolean) ? `../assets/img/logo/logo_${id}.png` : `../assets/img/logo/logo_${id}_crossed.png`;
		logo.title = (boolean) ? alt : `pas de ${alt}`;
	}
})();
