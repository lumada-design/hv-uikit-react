#!/bin/bash

set -e

[[ -z "$CODE_DX_URL" ]] && {
    echo "error: CODE_DX_URL is required"
    exit 1
}
[[ -z "$CODE_DX_API_KEY" ]] && {
    echo "error: CODE_DX_API_KEY is required"
    exit 1
}
[[ -z "$CODE_DX_PROJECT_ID" ]] && {
    echo "error: CODE_DX_PROJECT_ID is required"
    exit 1
}

# Set variables
ROOT_DIR=$(pwd)

echo "--------------------------------------"
echo "Upload reports to Code Dx"
echo "--------------------------------------"

REPORT_FILE=$ROOT_DIR/reports/dependency-check-report.xml
echo @$REPORT_FILE

if [ ! -f $REPORT_FILE ]; then
    echo "❌  UI Kit ${REPORT_DIR##*/}: dependency-check report file NOT found. Exiting..."
    exit 1
else
    echo "⬆️  UI Kit ${REPORT_DIR##*/}: dependency-check report file found. Uploading results..."
fi

COMMAND=" \
    curl -s \
    -F file1=@$REPORT_FILE \
    -H \"API-Key: $CODE_DX_API_KEY\" \
    -H \"accept: */*\" \
    -H \"Content-Type: multipart/form-data\" \
    $CODE_DX_URL/codedx/api/projects/$CODE_DX_PROJECT_ID/analysis"

COMMAND_RESPONSE=$(eval "$COMMAND 2>&1")
echo "$COMMAND_RESPONSE"

if echo "$COMMAND_RESPONSE" | grep -q "ERROR"; then
    exit 1
else
    echo "✅ SUCCESS"
fi
