import ImageSource from 'ol/source/Image';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import XYZ from 'ol/source/XYZ.js';


function customLoader(tile, src) {
    var client = new XMLHttpRequest();
    client.open('GET', src);
    client.responseType = "arraybuffer";
    // Uncomment to pass authentication header
    client.setRequestHeader("Authorization", "Bearer " + jwtAccessToken);
    client.onload = function () {
        var arrayBufferView = new Uint8Array(this.response);
        var blob = new Blob([arrayBufferView], { type: 'image/png' });
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);
        tile.getImage().src = imageUrl;
    };
    client.send();
}


export var ol_map = new Map({
    target: 'ol-map',
    layers: [
        new TileLayer({
            source: new XYZ({
                url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        }),
        new TileLayer({
            source: new XYZ({
                url: defrost_tiles_url,
                tileLoadFunction: customLoader,
                crossOrigin: 'anonymous'
            }),
            opacity: 0.3
        })
    ],
    view: new View({
        center: [862625.87, 5783667.03],
        zoom: 12,
    })
});