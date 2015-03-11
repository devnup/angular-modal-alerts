#!/bin/sh

echo "----------------------------------------";
echo "Cleaning dist files...";
rm -rf src/dist;

echo "----------------------------------------";
echo "Installing bower components...";
./node_modules/bower/bin/bower install --config.interactive=false -F

echo "----------------------------------------";
echo "Building files using Grunt...";
./node_modules/grunt-cli/bin/grunt default

echo "----------------------------------------";
echo "Generating docs using JSDoc...";
./node_modules/jsdoc/jsdoc.js -c conf.json

echo "----------------------------------------";
echo "Post install script OK!";
echo "----------------------------------------";

exit 0;