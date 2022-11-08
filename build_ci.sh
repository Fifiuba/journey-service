#!/usr/bin/env

# al primer error corta la ejecucion
set -e

echo "starting linter"
npx eslint  . --ext .js --fix
echo "starting test"
npm test 
echo "build ci finished!"
