#!/bin/bash

set -e

case $1 in
"code-editor") echo "react-code-editor";;
"core") echo "react-core";;
"icons") echo "react-icons";;
"lab") echo "react-lab";;
"shared") echo "react-shared";;
"styles") echo "styles";;
"uno-preset") echo "uno-preset";;
"viz") echo "react-viz";;
esac
