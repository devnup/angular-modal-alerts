#!/bin/sh
echo "Installing bower dependencies...";
./node_modules/bower/bin/bower install;

echo "Creating JSDocs...";
./node_modules/jsdoc/jsdoc.js -c ./jsdoc/conf.json;

echo "Running grunt...";
./node_modules/grunt-cli/bin/grunt default;
