import mapboxgl from 'mapbox-gl';


export class MBMap {
    constructor(target, defrost_maps_url, token) { 
        mapboxgl.accessToken = 'pk.eyJ1Ijoid2VnYXciLCJhIjoiY2pvaWdwdDB5MDJlYjNrczE4eXJzM25ncCJ9.ZsEbOz5jY8rNJGb0RUM70Q';
        
        this.map = new mapboxgl.Map({
            container: target,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [7.7491, 46.0207],
            zoom: 11,
            transformRequest: (url, resourceType) => {
                if (resourceType === 'Tile' && url.startsWith(defrost_maps_url.split('/{z}/{x}/{y}.png')[0])) {
                    return {
                        url: url,
                        headers: { 'Authorization': 'Bearer ' + token },
                    }
                }
            }
        });

        this.map.on('load', function(){
            var dfTileLayer = {
                "id": 'df',
                "type": "raster",
                "source": {
                    "type": "raster",
                    "tiles": [defrost_maps_url,],
                    "tileSize": 256,
                    "maxzoom": 13
                },
                "paint": {
                    "raster-opacity": 0.3,
                    "raster-resampling": "linear"
                }
            };
            this.addLayer(dfTileLayer);
        });
    }
}