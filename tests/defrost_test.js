// In this example we will use axios to make requests to the API
// Make sure you import axios
// In Webpack
// import axios from 'axios'
// In Node.JS
// let axios = require('axios')
// In the browser load axios in a script tag. For a quickstart you can use the CDN below
// <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

// URLs used in this example
let DEFROST_SAMPLE_API_URL = 'http://api.dev.defrost.ch/v1/snow-covers/'
let DEFROST_TOKEN_REFRESH_URL = 'http://api.dev.defrost.ch/v1/token/refresh/'
// your API tokens
let DEFROST_JWT_ACCESS_TOKEN = 'YOUR ACCESS TOKEN GOES HERE'
let DEFROST_JWT_REFRESH_TOKEN = 'YOUR REFRESH TOKEN GOES HERE'

async function test () {
    // if necessary, this is how you would refresh your access token
    let response = await axios
        .post(DEFROST_TOKEN_REFRESH_URL, {
            refresh: DEFROST_JWT_REFRESH_TOKEN
        })

    if(response.status == 200) {
        console.info('Your new access token is ', response.data['access'])
        DEFROST_JWT_ACCESS_TOKEN = response.data['access']
    }
    
    // make sure you always include your access token in every request
    axios.interceptors.request.use( config => {
        config.headers.Authorization = 'Bearer ' + DEFROST_JWT_ACCESS_TOKEN
        return config
    }, error => {
        return Promise.reject(error)
    })
    
    // // now you are ready to make an API call
    response = await axios.get(DEFROST_SAMPLE_API_URL)
    if( response.status == 200) {
        console.info(response.statusText,'(',response.status,') ',response.data)
        return response.data
    }

    return response.status
}

test()