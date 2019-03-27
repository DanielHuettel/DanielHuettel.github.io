/*alert("hallo welt")*/

const div = document.getElementById("map");
const breite1 = div.getAttribute("data-lat1");
const laenge1 = div.getAttribute("data-lng1");
const titel1 = div.getAttribute("data-title1");
const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-title2");

//console.log("Breite=", breite1, "Länge=", laenge1, "Titel=", titel1);

//karte initialisieren

let karte = L.map("map");

//console.log(karte);
//auf ausschnitt zoomen
karte.setView(
    [47.2, 11.2],
    8 //Zoomlevel, auf den karte eingestellt ist

);
//openstreetmap einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

// Positionsmarker hinzufügen
let pin1 = L.marker(
    [breite1, laenge1]
).addTo(karte)
let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte)

// Popup zum PIN hängen
pin1.bindPopup(titel1).openPopup();
pin2.bindPopup(titel2).openPopup();
for (let blick of ADLERBLICKE) {
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(karte);
    blickpin.bindPopup(
        `<h1>Standort ${blick.standort}</h1>
    <p> Höhe ${blick.hoehe} m </p>
    <em>Kunde ${blick.kunde}</em>`
    );
}