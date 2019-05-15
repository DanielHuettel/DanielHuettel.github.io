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
//let farben =[
  //  [0,"blau"], 
  //  [5, "gelb"], 
  //  [10,"rot"]
//];
//farben.length;
//farben[2][1]
//for (let i=0; i<farben.length; i++){
 //   console.log(farben[i]);
//}


        //falls keine Windgeschwindigkeit aufm Server hinterlegt ist, aoll nichts abgezeigt werden
        //Windrichtung und Einfärbung der Pfeile
        .addTo(awsTirol);
    awsTirol.addTo(karte);
    karte.fitBounds(awsTirol.getBounds());
    layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");

    //Pfeilfarbe
    const windlayer = L.featureGroup();
    const windgeschArrowPalette = [
        [3.60, "#05B603"], //<3
        [8.23, "#0ECE24"], //3-4
        [11.32, "#73D36F"], //4-5
        [14.40, "#FBD8D3"], //6
        [17.49, "#FFB4B3"], //7
        [21.09, "#FF9F9D"], //8
        [24.69, "#FF8281"], //9
        [28.81, "#FE5F61"], //10
        [32.96, "#FE4341"], //11
        [999, "#FF1F0E"], //>11
    ];

    L.geoJson(stations, {
            pointToLayer: function (feature, latlng) {
                let color = windgeschArrowPalette[windgeschArrowPalette.length - 1][1];
                for (let i = 0; i < windgeschArrowPalette.length; i++) {
                    if (feature.properties.WG < windgeschArrowPalette[i][0]) {
                        color = windgeschArrowPalette[i][1];
                        break;
                    } else {}
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style="color: ${color}; transform: rotate(${feature.properties.WR-45}deg)"class="fas fa-location-arrow fa-2x"></i>`
                    })

                });


            }
        }
        ).addTo(windlayer);
layerControl.addOverlay(windlayer, "Windrichtung");
windlayer.addTo(karte);

//Temperatur
const temperaturLayer = L.featureGroup();
const farbPalette = [
    [-20, "#6B655F"], //<-20
    [-10, "#732E75"], //-20 bis -10
    [0, "#3701DA"], //-10 bis 0
    [10, "#007800"], //0 bis 10
    [20, "#FCFE05"], //10 bis 20
    [30, "#F77700"], //20 bis 30
    [40, "#F20205"], //30 bis 40        
    [99, "730405"], //>40   
];
L.geoJson(stations, {
    pointToLayer: function (feature, latlng) {
        if (feature.properties.LT) {
            let color = "red";
            for (let i = 0; i < farbPalette.length; i++) {
                console.log(farbPalette[i], feature.properties.LT);
                if (feature.properties.LT < farbPalette[i][0]) {
                    color = farbPalette[i][1];
                    break;
                } else {

                }
            }
            // let color = "blue";
            //if (feature.properties.LT > 0) {
            //    color = "red"
            return L.marker(latlng, {
                icon: L.divIcon({
                    html: `<div class="temperaturLabel" style="background-color:${color}">${feature.properties.LT}</div>`
                })



            });

        }
    }

}).addTo(temperaturLayer);
layerControl.addOverlay(temperaturLayer, "Temperatur");
temperaturLayer.addTo(karte)


// Relative Feuchte
const feuchteLayer = L.featureGroup();
const feuchtePalette = [
    [30, "#F0EEF2"],
    [40, "#DBDEDB"],
    [50, "#C4C9C8"],
    [60, "#BCBDBE"],
    [70, "#ABA9D1"],
    [80, "#9D95DE"],
    [90, "#8B85EC"],
    [999, "#7677E4"],
];

L.geoJson(stations, {
    pointToLayer: function (feature, latlng) {
        if (feature.properties.RH) {
            let color = feuchtePalette[feuchtePalette.length - 1][1];
            for (let i = 0; i < feuchtePalette.length; i++) {
                if (feature.properties.RH < feuchtePalette[i][0]) {
                    color = feuchtePalette[i][1];
                    break;
                } else {}
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="feuchteLabel" style="background-color:${color}">${feature.properties.RH}</div>`
                    })
                });
            }
        }
    }
}).addTo(feuchteLayer);
layerControl.addOverlay(feuchteLayer, "Relative Feuchte");

// Windgeschwindigkeit
const windgeschLayer = L.featureGroup();
const windgeschPalette = [
    [3.60, "#05B603"], //<3
    [8.23, "#0ECE24"], //3-4
    [11.32, "#73D36F"], //4-5
    [14.40, "#FBD8D3"], //6
    [17.49, "#FFB4B3"], //7
    [21.09, "#FF9F9D"], //8
    [24.69, "#FF8281"], //9
    [28.81, "#FE5F61"], //10
    [32.96, "#FE4341"], //11
    [999, "#FF1F0E"], //>11
];

L.geoJson(stations, {
    pointToLayer: function (feature, latlng) {
        if (feature.properties.WG) {
            let color = windgeschPalette[windgeschPalette.length - 1][1];
            for (let i = 0; i < windgeschPalette.length; i++) {
                if (feature.properties.WG < windgeschPalette[i][0]) {
                    color = windgeschPalette[i][1];
                    break;
                } else {}
            }
            return L.marker(latlng, {
                icon: L.divIcon({
                    html: `<div class="windgeschLabel" style="background-color:${color}">${feature.properties.WG}</div>`
                })
            });
        }
    }
}).addTo(windgeschLayer);
layerControl.addOverlay(windgeschLayer, "Windgeschwindigkeit");
}

loadStations();

//onsole.log(AWS);