
//innitiiert karte
let karte = L.map("map");

//Ausschnitt und Zoomfaktor festlegen
//karte.setView(
 //  [47, 11], 13
   // );

//locate=auf standort zoomen
karte.locate({
    setView : true,
    maxZoom : 18,
});

//marker setzen auf located position
karte.on("locationfound", function(event){
    console.log(event);
    L.marker([
        event.latitude, event.longitude
    ]).addTo(karte);
    //Kreis zeichnen um Positionsmarker mit Radius der genauigkeit der Standortmarkers
    L.circle([
        event.latitude, event.longitude],
        {radius: event.accuracy/2}
        ).addTo(karte);
});

//L.circle({
   // event.latitude, event.longitude, 518}).addTo




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
    "watercolor" : kartenLayer.stamen_watercolor,
    "terrain" : kartenLayer.stamen_terrain, 
    "toner" : kartenLayer.stamen_toner
})
.addTo(karte);
