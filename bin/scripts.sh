#!/bin/sh
cp bin/template $1 -rT
echo 'Files copied'

cd $1

echo 'Installing dependencies'
npm install --save express mongoose dotenv cors
echo 'Dependencies installed'
echo 'Installing dev-dependencies'
npm install --save-dev @babel/core @babel/cli
npm install --save-dev @babel/node
npm install --save-dev @babel/preset-env
echo 'dev-dependencies installed'

echo 'Configuring git'
git init
git add .
git commit -m "Initial commit"
