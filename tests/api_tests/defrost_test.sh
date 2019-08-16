#! /bin/bash
# URLs used in this example
export API_URL="http://api.defrost.ch/v1/snow-covers/"
export REFRESH_URL="http://api.defrost.ch/v1/token/refresh/"
# your API tokens
export JWT_ACCESS_TOKEN="YOUR ACCESS TOKEN GOES HERE"
export JWT_REFRESH_TOKEN="YOUR REFRESH TOKEN GOES HERE"

# if necessary, this is how you would refresh your access token
JWT_ACCESS_TOKEN=`curl -X POST -F "refresh=$JWT_REFRESH_TOKEN" "$REFRESH_URL" | sed -E "s/\{\"access\":\"(.+?)\"\}/\1/gI"`
echo "Your new access token is $JWT_ACCESS_TOKEN"
# you can now make an API call
# make sure you always include your access token in every request
DATA=`curl --header "Authorization: Bearer $JWT_ACCESS_TOKEN" "$API_URL"`
echo "DATA RECEIVED: $DATA"