// In this example we will use axios to make requests to the API
// Make sure you import axios
// In ES6
// import axios from 'axios'
// In Node.JS
// let axios = require('axios')
// In the browser load axios in a script tag. For a quickstart you can use the CDN below
// <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

import axios from 'axios'

// URLs used in this example
let SAMPLE_API_URL = 'http://api.defrost.ch/v1/snow-covers/'
let TOKEN_REFRESH_URL = process.env.TOKEN_REFRESH_URL


export class APITester{
    constructor(accessToken, refreshToken){
        this.token = accessToken;
        this.refreshToken = refreshToken;
    }

    async test(){
        // if necessary, this is how you would refresh your access token
        let response = await axios
        .post(TOKEN_REFRESH_URL, {
            refresh: this.refreshToken
        })

        if(response.status == 200) {
            console.info('Your new access token is ', response.data['access'])
            this.token = response.data['access']
            // Display in HTML
            var node = document.createElement("P");              
            var textnode = document.createTextNode('Refresh token request\nYour new access token: ' + this.token);        
            node.appendChild(textnode);                              
            document.getElementById("api").appendChild(node);   
        }

        // make sure you always include your access token in every request
        axios.interceptors.request.use( config => {
            config.headers.Authorization = 'Bearer ' + this.token
            return config
        }, error => {
            return Promise.reject(error)
        })

        // // now you are ready to make an API call
        response = await axios.get(SAMPLE_API_URL)
        if( response.status == 200) {
            console.info(response.statusText,'(',response.status,') ',response.data)
            // Display in HTML
            var node = document.createElement("P");    
            var msg = 'Request to ' + SAMPLE_API_URL
            msg += '\nStatus: ' + response.statusText +' ('+response.status+')';
            msg += '\nData:\n' + JSON.stringify(response.data);
            var textnode = document.createTextNode(msg);        
            node.appendChild(textnode);                              
            document.getElementById("api").appendChild(node);   
            return response.data
        }

        return response.status
    }
}