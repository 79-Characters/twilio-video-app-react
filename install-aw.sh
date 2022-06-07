#!/bin/bash
set -xe

rm -rf aw node_modules/@agent-walrus
mkdir aw

cd ../agent-web
npm run build
npm pack --pack-destination=../twilio-video-app-react/aw

cd ../twilio-video-app-react
npm install ./aw/*
