export class GMap{
    constructor(target, defrost_maps_url, token) { 
        
        this.map = new google.maps.Map(document.getElementById(target), {
            center: {lat: 46.0207, lng: 7.7491}, 
            zoom: 12
        });

        // Name the layer anything you like.
        var layerID = 'defrost_alps_snow';

        // Attention: Google Maps JS API does not allow to set an Authorization header
        // in each tile request. We are therefore forced to set the token as a query parameter.
        // BEWARE: this has an increased security risk, as the token is exposed. This is why it is
        // mandatory to whitelist the domains from which you will use it. 
        // Check https://defrost.io/api-docs#tag/Domain-whitelist to learn how.
        defrost_maps_url = defrost_maps_url + '?token=' + token;
        // Create a new ImageMapType layer.
        var layer = new google.maps.ImageMapType({
            name: layerID,
            getTileUrl: function(coord, zoom) {
                var url = defrost_maps_url
                .replace('{x}', coord.x)
                .replace('{y}', coord.y)
                .replace('{z}', zoom);
                return url;
            },
            tileSize: new google.maps.Size(256, 256),
            minZoom: 1,
            maxZoom: 20,
            isPng: true,
            opacity: 0.30
        });

        // Register the new layer, then activate it.
        this.map.overlayMapTypes.push(layer);
    }
}