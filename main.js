var defrost_maps_url = process.env.DEFROST_MAPS_URL;
var token = process.env.JWT_ACCESS_TOKEN;
var refreshToken = process.env.JWT_REFRESH_TOKEN;

import {OLMap} from './tests/map_tests/ol-map.js';
import {MBMap} from './tests/map_tests/mapbox-map.js';
import {LMap} from './tests/map_tests/leaflet-map.js';
import {APITester} from './tests/api_tests/defrost_test.js';

var ol_map = new OLMap('ol-map', defrost_maps_url, token);
var mb_map = new MBMap('mapbox-map', defrost_maps_url, token);
var l_map = new LMap('leaflet-map', defrost_maps_url, token);

var api_tester = new APITester(token, refreshToken);
api_tester.test();