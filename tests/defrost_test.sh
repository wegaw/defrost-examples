#! /bin/bash
# URLs used in this example
export DEFROST_API_URL="http://api.dev.defrost.ch/v1/snow-covers/"
export DEFROST_REFRESH_URL="http://api.dev.defrost.ch/v1/token/refresh/"
# your API tokens
export DEFROST_JWT_ACCESS_TOKEN="YOUR ACCESS TOKEN GOES HERE"
export DEFROST_JWT_REFRESH_TOKEN="YOUR REFRESH TOKEN GOES HERE"

# if necessary, this is how you would refresh your access token
DEFROST_JWT_ACCESS_TOKEN=`curl -X POST -F "refresh=$DEFROST_JWT_REFRESH_TOKEN" "$DEFROST_REFRESH_URL" | sed -E "s/\{\"access\":\"(.+?)\"\}/\1/gI"`
echo "Your new access token is $DEFROST_JWT_ACCESS_TOKEN"
# you can now make an API call
# make sure you always include your access token in every request
DATA=`curl --header "Authorization: Bearer $DEFROST_JWT_ACCESS_TOKEN" "$DEFROST_API_URL"`
echo "DATA RECEIVED: $DATA"