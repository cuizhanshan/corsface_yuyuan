#!/bin/bash

DIR="$( cd "$( dirname "$0"  )" && pwd  )"
DIST_PATH="/Users/tom/develop/cf_project/cfAdmin2_4/src/main/webapp/cf"


cd ../
npm run build

cp -r dist/* ${DIST_PATH}/
rm ${DIST_PATH}/login.html
rm ${DIST_PATH}/index.html
