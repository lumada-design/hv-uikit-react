#!/bin/bash
bash <(curl -k1 https://detect.synopsys.com/detect.sh -o detect.sh) 
chmod 777 detect.sh
DETECT_DIR=`pwd`
echo "DETECT_DIR - ${DETECT_DIR}"

declare -a packages=("core" "lab" "icons" "themes" "code-editor")

DETECT_ARGS="--blackduck.url=${BLACKDUCK_URL} --blackduck.api.token=${BLACKDUCK_TOKEN} --blackduck.trust.cert=true --detect.project.version.name=v2.x"

for i in "${packages[@]}"
do
    ./detect.sh $DETECT_ARGS --detect.project.name=uikit-$i --detect.source.path=${DETECT_DIR}/packages/$i/dist 
    ./detect.sh $DETECT_ARGS --detect.project.name=uikit-$i --detect.source.path=${DETECT_DIR}/packages/$i/src
done
