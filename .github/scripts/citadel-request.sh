#!/bin/bash

set -e

# Set variables
ROOT_DIR=$(pwd)

echo "--------------------------------------"
echo "Request Citadel Scan"
echo "--------------------------------------"

REPORT_FILE=$ROOT_DIR/.github/security-configurations/citadel-uikit.json

echo "Sending the json request:"
cat $REPORT_FILE

COMMAND=" \
    curl -k -X POST 'https://citadel.orl.eng.hitachivantara.com/citadel' \
    --header 'Content-Type: application/json' \
    -d @$REPORT_FILE"

COMMAND_RESPONSE=$(eval "$COMMAND 2>&1")
echo "$COMMAND_RESPONSE"

if echo "$COMMAND_RESPONSE" | grep -q "failed"; then
    exit 1
else
    echo "✅ SUCCESS"
fi
