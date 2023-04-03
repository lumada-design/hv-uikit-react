#!/bin/bash

set -e

[[ -z "$BLACKDUCK_URL" ]] && {
    echo "error: BLACKDUCK_URL is required"
    exit 1
}

[[ -z "$BLACKDUCK_TOKEN" ]] && {
    echo "error: BLACKDUCK_TOKEN is required"
    exit 1
}

[[ -z "$DETECT_VERSION" ]] && {
    echo "error: DETECT_VERSION is required"
    exit 1
}

# Set variables
DETECT_DIR=$(pwd)

# Check if detect.sh exists, and download it if it does not
if [[ ! -f "detect.sh" ]]; then
    bash <(curl -k1 https://detect.synopsys.com/detect${DETECT_VERSION}.sh -o detect.sh)
    chmod +x detect.sh
fi

DETECT_ARGS="--blackduck.url=${BLACKDUCK_URL} \
    --blackduck.api.token=${BLACKDUCK_TOKEN} \
    --blackduck.trust.cert=true \
    --detect.included.detector.types=NPM \
    --detect.npm.include.dev.dependencies=false"

# Loop through each package directory in the repository
for package in "$DETECT_DIR/packages"/*; do
    if [[ -d "$package" ]]; then
        # Extract the package name and version from the package.json file
        package_name=$(jq -r '.name' "${package}"/package.json)
        package_version=$(jq -r '.version' "${package}"/package.json)

        echo "--------------------------------------"
        echo "Run Blackduck scan:"
        echo "- PROJECT: $package_name"
        echo "- VERSION: $package_version"
        echo "--------------------------------------"

        # Call the detect.sh script to scan the package
        ./detect.sh $DETECT_ARGS --detect.project.name="${package_name}" --detect.project.version.name="${package_version}" --detect.source.path="${package}/src"
        ./detect.sh $DETECT_ARGS --detect.project.name="${package_name}" --detect.project.version.name="${package_version}" --detect.source.path="${package}/dist"
    fi
done
