import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {defaults as defaultControls} from 'ol/control.js';
import TileLayer from 'ol/layer/Tile.js';
import XYZ from 'ol/source/XYZ.js';
import OSM from 'ol/source/OSM.js';


export class OLMap {
    constructor(target, defrost_maps_url, token) { 
        this.target = target;
        this.token = token;
        this.snow_tiles_url = defrost_maps_url;

        this.map = new Map({
            target: this.target,
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                new TileLayer({
                    source: new XYZ({
                        url: defrost_maps_url,
                        tileLoadFunction: (tile, src) => {
                            var client = new XMLHttpRequest();
                            client.open('GET', src);
                            client.responseType = "arraybuffer";
                            // Uncomment to pass authentication header
                            client.setRequestHeader("Authorization", "Bearer " + this.token);
                            client.onload = function () {
                                var arrayBufferView = new Uint8Array(this.response);
                                var blob = new Blob([arrayBufferView], { type: 'image/png' });
                                var urlCreator = window.URL || window.webkitURL;
                                var imageUrl = urlCreator.createObjectURL(blob);
                                tile.getImage().src = imageUrl;
                            };
                            client.send();
                        },
                        crossOrigin: 'anonymous',
                        attributions: 'Snow data &copy; <a href="https://www.defrost.io/">WeGaw Ltd.</a>',
                    }),
                    opacity: 0.3
                })
            ],
            controls: defaultControls({
                attributionOptions:{
                    collapsed: false,
                    collapsible:false
                }
            }),
            view: new View({
                center: [862625.87, 5783667.03],
                zoom: 12,
            })
        });
    }
} 


