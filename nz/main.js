/*alert("hallo welt")*/
/*
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

/*alert("hallo welt")*/

const div = document.getElementById("map");
const breite1 = div.getAttribute("data-lat");
const laenge1 = div.getAttribute("data-lng");
const titel1 = div.getAttribute("data-title");


//console.log("Breite=", breite1, "Länge=", laenge1, "Titel=", titel1);

//karte initialisieren

let karte = L.map("map");

//console.log(karte);
//auf ausschnitt zoomen
karte.setView(
    [breite1, laenge1], 13
);
//openstreetmap einbauen
// L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
//     subdomains : ["a","b","c"], 
//     attribution : 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
// }).addTo(karte);

const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    stamen_toner : L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",{
    subdomains : ["a", "b", "c"],
    attribution : 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain : L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png",{
    subdomains : ["a", "b", "c"],
    attribution : 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_watercolor : L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png",{
    subdomains : ["a", "b", "c"],
    attribution : 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
})};

kartenLayer.osm.addTo(karte); //default hintergrundkarte



//Auswahlmenü hinzufügen
L.control.layers({
    "stamen_toner" : kartenLayer.stamen_toner,
    "stamen_terrain" : kartenLayer.stamen_terrain,
    "stamen_watercolor" : kartenLayer.stamen_watercolor,
    "osm" : kartenLayer.osm
}).addTo(karte);
    

// Positionsmarker hinzufügen
let pin1 = L.marker(
    [breite1, laenge1]
).addTo(karte);


// Popup zum PIN hängen
pin1.bindPopup(titel1).openPopup();



karte.addControl(new L.Control.Fullscreen());
let hash = new L.Hash(karte);
let coords = new L.Control.Coordinates();
coords.addTo(karte);
karte.on('click', function(e) {
	coords.setCoordinates(e);
});