/*alert("hallo welt")*/

const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

console.log("Breite=",breite,"Länge=",laenge,"Titel=",titel);

//karte initialisieren

let karte = L.map("map");

//console.log(karte);
//auf ausschnitt zoomen
karte.setView(
[breite,laenge],
13
);
//openstreetmap einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

// Positionsmarker hinzufügen
let pin = L.marker(
    [breite,laenge]
).addTo(karte)

// Popup zum PIN hängen
pin.bindPopup(titel).openPopup();