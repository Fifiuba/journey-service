#!/usr/bin/env
echo "starting linter"
npx eslint  . --ext .js --fix
clear
echo "starting test"
npm test 
echo "build ci finished!"
