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
const layerControl = L.control.layers({
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
// Daten für Temperatur live von Server aws.openweb ziehen; in der index html brauch es keine verlinkung mehr
async function loadStations() {
    const response = await fetch("https://aws.openweb.cc/stations");
    const stations = await response.json();
    //Wetterstationen hinzufügen aus geoJson, Popups einbinden, Popup Inhalt aus geoJson ziehen
    const awsTirol = L.featureGroup();
    L.geoJson(stations)
        .bindPopup(function (layer) {
            // console.log("Layer: ", layer);
            //Datums- und Zeitformat einstellen, Höhe und Temperatur, Windgeschwindigkeit vom Server ziehen
            const date = new Date(layer.feature.properties.date);
            console.log("Datum", date);
            return `<h4>${layer.feature.properties.name}</h4>
    Höhe: ${layer.feature.geometry.coordinates[2]} m<br>
    Temperatur: ${layer.feature.properties.LT} °C<br>
    Datum: ${date.toLocaleDateString("de-AT")}
    ${date.toLocaleTimeString("de-AT")}<br>
    Windgeschwindigkeit: ${layer.feature.properties.WG ? layer.feature.properties.WG + "km/h": "keine Daten" }
    <hr>
    <footer>Quelle: Land Tirol - <a href="https://data.tirol.gv.at">data.tirol.gv.at</a></footer>
    `;
        })

        //falls keine Windgeschwindigkeit aufm Server hinterlegt ist, aoll nichts abgezeigt werden

        .addTo(awsTirol);
    awsTirol.addTo(karte);
    karte.fitBounds(awsTirol.getBounds());
    layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");
    const windlayer = L.featureGroup();
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.WR) {
            return L.marker(latlng, {
                icon: L.divIcon({
                    html: `<i style="transform: rotate(${feature.properties.WR-45}deg)"class="fas fa-location-arrow fa-2x"></i>`
                })

            });


        }
    }
}).addTo(windlayer);
layerControl.addOverlay(windlayer, "Windrichtung");
windlayer.addTo(karte);
}
loadStations();

//onsole.log(AWS);