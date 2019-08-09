#! /bin/bash
export USERNAME="YOUR USERNAME HERE"
export PASSWORD="YOUR PASSWORD HERE"
# URLs used in this example
export DEFROST_TOKEN_URL="http://api.dev.defrost.ch/v1/token/"
export DEFROST_REFRESH_URL="http://api.dev.defrost.ch/v1/token/refresh/"
export DEFROST_SNOWMAP_URL="http://api.dev.defrost.ch/v1/snow-covers/"

# To obtain your set of tokens: First we execute the request with curl
# And then we parse it with python 3. You can also get your token from
# DeFROST dashboard.
DEFROST_JWT_ACCESS_TOKEN=`curl -H "Content-Type: application/json" -X POST -d '{"username": "'$USERNAME'", "password":"'$PASSWORD'"}' "$DEFROST_TOKEN_URL" | \
    python3 -c "import sys, json; print(json.load(sys.stdin)['access'])"`
echo "ACCESS TOKEN: $DEFROST_JWT_ACCESS_TOKEN"
# For readability, we extract the refresh token repeating the previous request
DEFROST_JWT_REFRESH_TOKEN=`curl -H "Content-Type: application/json" -X POST -d '{"username": "'$USERNAME'", "password":"'$PASSWORD'"}' "$DEFROST_TOKEN_URL" | \
    python3 -c "import sys, json; print(json.load(sys.stdin)['refresh'])"`
echo "REFRESHTOKEN: $DEFROST_JWT_REFRESH_TOKEN"
# If necessary, this is how you would refresh your access token
DEFROST_JWT_ACCESS_TOKEN=`curl -X POST -F "refresh=$DEFROST_JWT_REFRESH_TOKEN" "$DEFROST_REFRESH_URL" | sed -E "s/\{\"access\":\"(.+?)\"\}/\1/gI"`
echo "Your new access token is $DEFROST_JWT_ACCESS_TOKEN"
# With your access token, you can make API calls
# make sure you always include your access token in every request
DATA=`curl --header "Authorization: Bearer $DEFROST_JWT_ACCESS_TOKEN" "$DEFROST_SNOWMAP_URL"`
echo "DATA RECEIVED: $DATA"