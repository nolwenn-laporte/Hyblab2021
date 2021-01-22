let legendes = null;
let legendesMorbihanFantastique = getLegendes('Morbihan', 'Créatures Fantastiques', (r) => legendes = r);
legendesMorbihanFantastique.then((s) => {
    console.log(legendes);
    console.log(s);
    let box = document.querySelector('#testBox');
    for(l of s.data) {
        box.innerHTML += `Legende ${l.nom} :\n${l.histoire}\n`;
    }
}, (r) => console.log(r));
console.log(legendesMorbihanFantastique);
console.log(legendes);