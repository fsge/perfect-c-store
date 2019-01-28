#! /bin/bash

bundle exec jekyll contentful --rebuild 
./bin/transformYAML.sh 
cd js/savings-calculator 
npm install --no-optional 
cd ../.. 
bundle exec jekyll build
