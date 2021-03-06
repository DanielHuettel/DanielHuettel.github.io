//innitiiert karte
let karte = L.map("map");

karte.setView([47.26722, 11.392778], 15)

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
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    }),
};
kartenLayer.geolandbasemap.addTo(karte)

//Auswahlmenü hinzufügen
L.control.layers({
        "geolandbasemap": kartenLayer.geolandbasemap,
        "geolandbasemapgrau": kartenLayer.geolandbasemapgrau,
        "basemaphighdpi": kartenLayer.basemaphighdpi,
        "geolandbasemaporthofoto": kartenLayer.geolandbasemaporthofoto,
        "eolandbasemapgelände": kartenLayer.geolandbasemapgelände,
        "geolandbasemapoberfläche": kartenLayer.geolandbasemapoberfläche,
        "osm": kartenLayer.osm,
        "watercolor": kartenLayer.stamen_watercolor,
        "terrain": kartenLayer.stamen_terrain,
        "toner": kartenLayer.stamen_toner
    })
    .addTo(karte);
   
    //console.log(SPORTSTAETTEN);

    //positionsmarker und popup für STAETTE HINZUFÜGEN
    for (let staette of SPORTSTAETTEN) {
        //console.log(staette);
        
        
        let piktogramm = L.icon({  // Piktogramm definieren
            iconUrl : `icons/icon_${staette.icon}_schwarz_auf_weiss_250px.png`,
            iconSize : [40,40]
            
        });
        let positionsMarker = L.marker([staette.lat, staette.lng], {
            icon : piktogramm
        }).addTo(karte); //marker setzten und hinzufügen
       
            positionsMarker.bindPopup(`
            <h3> ${staette.anlage}</h3>
            <p> ${staette.typ}</p>
            `)
    }
    


