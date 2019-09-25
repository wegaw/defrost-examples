

<div align="left">
  <a href="https://defrost.ch">
    <img width="126" height="100" src="https://d1klwwcx1csego.cloudfront.net/static/images/defrost/logo.png">
  </a>
</div>

# DeFROST Code Examples

Demonstrates integration of [DeFROST](https://defrost.ch) Snow Cover tiles and API in supported platforms:

- OpenLayers 5.3, Leaflet 1.5 and Mapbox GL JS 1.2 for displaying snow cover tiles
- JavaScript, Python and Curl for API requests

The test web app can be launched using npm.

## Getting started

Setup your JWT Access and Refresh Tokens in the `.env.defaults` file. You can get them from [DeFROST Account Dashboard](https://dashboard.defrost.ch). For the Mapbox GL JS example to work, you also need to set your [Mapbox access token](https://account.mapbox.com/).

```sh
# .env.deaults, safe to commit
JWT_ACCESS_TOKEN=<YourJWTAccessTokenHere>
JWT_REFRESH_TOKEN=<YourJWTRefreshTokenHere>

DEFROST_MAPS_URL=https://maps.defrost.ch/{z}/{x}/{y}.png
TOKEN_REFRESH_URL=https://api.defrost.ch/v1/token/refresh/

MAPBOX_TOKEN=<YourMapboxTokenHere>
```

## Launching the test app

When ready, install dependencies and run the app with the following commands:

```console
npm install
npm run start:dev
```

This will trigger JavaScript bundle compilation using [webpack](https://webpack.js.org). Once the `Compiled successfully` message appears on your terminal, access the app at [localhost:8080](localhost:8080) from your browser.

*The test web application demonstrates DeFROST Snow Cover tiles integration, as well as making an API request using JavaScript. For the Python and Curl API tests, launch the files directly with your Python interpreter or from your terminal.*

## License

#### [MIT](./LICENSE)
