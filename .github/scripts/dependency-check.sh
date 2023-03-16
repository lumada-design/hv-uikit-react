#!/bin/bash

set -e

[[ -z "$DEP_CHECK_VERSION" ]] && {
    echo "error: DEP_CHECK_VERSION is required"
    exit 1
}

# Set variables
ROOT_DIR=$(pwd)

# Install OWASP Dependency Check
curl -L -o dependency-check.zip https://github.com/jeremylong/DependencyCheck/releases/download/v${DEP_CHECK_VERSION}/dependency-check-${DEP_CHECK_VERSION}-release.zip
unzip dependency-check.zip
rm dependency-check.zip
cd dependency-check/bin
chmod +x dependency-check.sh

echo "--------------------------------------"
echo "Run OWASP Dependency Check"
echo "--------------------------------------"

$ROOT_DIR/dependency-check/bin/dependency-check.sh \
    --project uikit \
    --out $ROOT_DIR/reports \
    --format HTML \
    --format XML \
    --disableArchive \
    --disableAssembly \
    --disableJar \
    --cveStartYea 2015 \
    --scan $ROOT_DIR
