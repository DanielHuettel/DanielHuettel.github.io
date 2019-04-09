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
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps1", "maps2", "maps3", "maps4"],
        attribution: 'datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    geolandbasemapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps1", "maps2", "maps3", "maps4"],
        attribution: 'datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    geolandbasemapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps1", "maps2", "maps3", "maps4"],
        attribution: 'datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    basemaphighdpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps1", "maps2", "maps3", "maps4"],
        attribution: 'datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    geolandbasemaporthofoto: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps1", "maps2", "maps3", "maps4"],
        attribution: 'datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    geolandbasemapgelände: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps1", "maps2", "maps3", "maps4"],
        attribution: 'datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    geolandbasemapoberfläche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps1", "maps2", "maps3", "maps4"],
        attribution: 'datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
};
kartenLayer.geolandbasemap.addTo(karte)

//Auswahlmenü hinzufügen
L.control.layers({
    "geolandbasemap" : kartenLayer.geolandbasemap,
    "geolandbasemapgrau" : kartenLayer.geolandbasemapgrau,
    "basemaphighdpi" : kartenLayer.basemaphighdpi,
    "geolandbasemaporthofoto" : kartenLayer.geolandbasemaporthofoto,
    "eolandbasemapgelände" : kartenLayer.geolandbasemapgelände,
    "geolandbasemapoberfläche" : kartenLayer.geolandbasemapoberfläche,
    "osm" : kartenLayer.osm,
    
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
    }),
}).addTo(karte)

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

let blickeGruppe = L.featureGroup().addTo(karte);

for (let blick of ADLERBLICKE) {
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(blickeGruppe);
    blickpin.bindPopup(
        `<h1>Standort ${blick.standort}</h1>
    <p> Höhe ${blick.hoehe} m </p>
    <em>Kunde ${blick.kunde}</em>`
    );
}
console.log(blickeGruppe.getBounds());

//auf auschnitt der blickgruppe zoomen
karte.fitBounds(blickeGruppe.getBounds());
karte.addControl(new L.Control.Fullscreen());
let hash = new L.Hash(karte);
let coords = new L.Control.Coordinates();
coords.addTo(karte);
karte.on('click', function(e) {
	coords.setCoordinates(e);
});

karte.setView(
    [blickeGruppe], 13
);