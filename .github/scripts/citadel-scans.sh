#!/bin/bash

set -e

[[ -z "$CITADEL_URL" ]] && {
    echo "error: CITADEL_URL is required"
    exit 1
}

[[ -z "$CITADEL_CONFIG" ]] && {
    echo "error: CITADEL_CONFIG is required"
    exit 1
}

curl -k -X POST ${CITADEL_URL} --header 'Content-Type: application/json' -d @${CITADEL_CONFIG}
