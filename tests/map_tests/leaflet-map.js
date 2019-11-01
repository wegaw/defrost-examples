import L from 'leaflet';
import * as Util from 'leaflet/src/core/Util';
import * as DomEvent from 'leaflet/src/dom/DomEvent';

export class LMap {
    constructor(target, defrost_maps_url, token){
        this.target = target;
        this.token = token;
        this.snow_tiles_url = defrost_maps_url;

        // We will create a new TileLayer class in Leaflet which uses Authentication Bearer headers
        // When extending Leaflet's TileLayer class, we override the createTile function
        L.TileLayer.headers = L.TileLayer.extend({
            createTile(coords, done) {
                var tile = document.createElement('img');

                DomEvent.on(tile, 'load', Util.bind(this._tileOnLoad, this, done, tile));
                DomEvent.on(tile, 'error', Util.bind(this._tileOnError, this, done, tile));

                if (this.options.crossOrigin || this.options.crossOrigin === '') {
                    tile.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
                }

                /*
                Alt tag is set to empty string to keep screen readers from reading URL and for compliance reasons
                http://www.w3.org/TR/WCAG20-TECHS/H67
                */
                tile.alt = '';

                /*
                Set role="presentation" to force screen readers to ignore this
                https://www.w3.org/TR/wai-aria/roles#textalternativecomputation
                */
                tile.setAttribute('role', 'presentation');

                // Custom code to query tiles using Bearer Authentication headers 
                var url = this.getTileUrl(coords);
                var client = new XMLHttpRequest();
                client.open('GET', url);
                client.responseType = "arraybuffer";
                client.setRequestHeader("Authorization", "Bearer " + token);
                client.onload = function () {
                    var arrayBufferView = new Uint8Array(this.response);
                    var blob = new Blob([arrayBufferView], { type: 'image/png' });
                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL(blob);
                    tile.src = imageUrl;
                    done(null, tile);
                };
                client.send();

                return tile;
            }
        });
        L.tileLayer.headers = (url, options) => new L.TileLayer.headers(url, options);

        this.map = L.map(this.target).setView([46.0207, 7.7491], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(this.map);

        // Notice 
        L.tileLayer.headers(this.snow_tiles_url, {
            attribution: 'Snow data &copy; <a href="https://www.defrost.io/">WeGaw Ltd.</a>',
            crossOrigin: 'anonymous',
            opacity: 0.3
        }).addTo(this.map);
    }
}