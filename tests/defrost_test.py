#!/usr/bin/python
import requests

# URLs used in this example
DEFROST_SAMPLE_API_URL = 'http://api.dev.defrost.ch/v1/snow-covers/'
DEFROST_TOKEN_REFRESH_URL = 'http://api.dev.defrost.ch/v1/token/refresh/'
# your API tokens
DEFROST_JWT_ACCESS_TOKEN = 'YOUR ACCESS TOKEN GOES HERE'
DEFROST_JWT_REFRESH_TOKEN = 'YOUR REFRESH TOKEN GOES HERE'

session = requests.Session()
# if necessary, this is how you would refresh your access token
r = session.post( DEFROST_TOKEN_REFRESH_URL, data={ 'refresh': DEFROST_JWT_REFRESH_TOKEN } )
if r.status_code == 200:
    data = r.json()
    print( 'Your new access token is ', data['access'] )
    DEFROST_JWT_ACCESS_TOKEN = data['access']

# make sure you always include your access token in every request
headers = { 'Authorization': 'Bearer ' + DEFROST_JWT_ACCESS_TOKEN }

# now you are ready to make an API call
r = session.get( DEFROST_SAMPLE_API_URL, headers=headers )
if r.status_code == 200:
    data = r.json()
    print( 'Data retrieved', data )
