#!/bin/bash

#shellcheck disable=SC2148
set -e
DEP_CHECK_TOOL_VERSION=${DEP_CHECK_TOOL_VERSION:-6.1.0}
PROJECT_NAME="$1"
path="${2:-.}"
customArgs="${3:-}"
WORKSPACE="${4:-$path}"

[[ -z "$PROJECT_NAME" ]] && { echo "error: PROJECT_NAME param is required" ; exit 1; }
[[ -z "$CODE_DX_SERVER_URL" ]] && { echo "error: CODE_DX_SERVER_URL is required" ; exit 1; }
[[ -z "$CODE_DX_SERVER_API_KEY" ]] && { echo "error: CODE_DX_SERVER_API_KEY is required" ; exit 1; }
[[ -z "$CODE_DX_SERVER_PROJECT_ID" ]] && { echo "error: CODE_DX_SERVER_PROJECT_ID is required" ; exit 1; }

echo "path: $path"
echo "custom args: ${customArgs}"
echo "WORKSPACE: $WORKSPACE"

wget --quiet -N "https://github.com/jeremylong/DependencyCheck/releases/download/v${DEP_CHECK_TOOL_VERSION}/dependency-check-${DEP_CHECK_TOOL_VERSION}-release.zip"
unzip -q "dependency-check-${DEP_CHECK_TOOL_VERSION}-release.zip"

COMMAND=" \
dependency-check/bin/dependency-check.sh \
  --project \"$PROJECT_NAME\" \
  --format XML \
  --prettyPrint \
  --scan $path \
  --exclude $path/*.zip \
  --exclude $path/*.tar \
  --exclude $path/*.gz \
  --exclude $path/*.war \
  --disableNodeJS \
  --disableAssembly \
  --disableYarnAudit \
  --out ${WORKSPACE} \
  ${customArgs}"


echo "$COMMAND"
COMMAND_RESPONSE=$(eval "$COMMAND 2>&1")
echo "$COMMAND_RESPONSE"
if [ ! -f dependency-check-report.xml ]; then
   echo "dependency-check-report.xml NOT generated ... exiting"
   exit 1
else
   echo "dependency-check-report.xml generated"
fi



COMMAND=" \
curl -s \
   -F file1=@dependency-check-report.xml \
   -H \"API-Key: ${CODE_DX_SERVER_API_KEY}\" \
   -H \"accept: */*\" \
   -H \"Content-Type: multipart/form-data\" \
   ${CODE_DX_SERVER_URL}/codedx/api/projects/${CODE_DX_SERVER_PROJECT_ID}/analysis"


echo "$COMMAND"
COMMAND_RESPONSE=$(eval "$COMMAND 2>&1")
echo "$COMMAND_RESPONSE"
if echo "$COMMAND_RESPONSE" | grep -q "ERROR"; then
   exit 1
else
   echo "SUCCESS"
fi

# set a proper name of the analysis
# shellcheck disable=SC2086
ANALYSIS_ID=$( echo ${COMMAND_RESPONSE} | jq .analysisId )

PROJECT_NAME_JSON="\
{ \
\"name\": \"OWASP Dep Check ${SUITE_RELEASE_VERSION}-${RELEASE_BUILD_NUMBER}\" \
}"

COMMAND=" \
curl -X PUT \
	 -H \"API-Key: ${CODE_DX_SERVER_API_KEY}\" \
     -H \"Content-Type: application/json\" \
     -d '${PROJECT_NAME_JSON}' \
     ${CODE_DX_SERVER_URL}/codedx/api/projects/${CODE_DX_SERVER_PROJECT_ID}/analysis/${ANALYSIS_ID}"


echo "$COMMAND"
COMMAND_RESPONSE=$(eval "$COMMAND 2>&1")
echo "$COMMAND_RESPONSE"
if echo "$COMMAND_RESPONSE" | grep -q "ERROR"; then
   exit 1
else
   echo "SUCCESS"
fi

# cleanup
if [ -d "./dependency-check" ]; then rm -rf "./dependency-check"; fi
if [ -f "./dependency-check-${DEP_CHECK_TOOL_VERSION}-release.zip" ]; then rm "./dependency-check-${DEP_CHECK_TOOL_VERSION}-release.zip"; fi