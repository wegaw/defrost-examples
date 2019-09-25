#!/usr/bin/python
import requests

# URLs used in this example
SAMPLE_API_URL = 'https://api.defrost.ch/v1/snow-point/45.9766/7.6585/'
TOKEN_REFRESH_URL = 'https://api.defrost.ch/v1/token/refresh/'
# your API tokens
JWT_ACCESS_TOKEN = 'YOUR ACCESS TOKEN GOES HERE'
JWT_REFRESH_TOKEN = 'YOUR REFRESH TOKEN GOES HERE'

session = requests.Session()
# if necessary, this is how you would refresh your access token
r = session.post( TOKEN_REFRESH_URL, data={ 'refresh': JWT_REFRESH_TOKEN } )
if r.status_code == 200:
    data = r.json()
    print( 'Your new access token is ', data['access'] )
    JWT_ACCESS_TOKEN = data['access']

# make sure you always include your access token in every request
headers = { 'Authorization': 'Bearer ' + JWT_ACCESS_TOKEN }

# now you are ready to make an API call
r = session.get( SAMPLE_API_URL, headers=headers )
if r.status_code == 200:
    data = r.json()
    print( 'Data retrieved', data )
