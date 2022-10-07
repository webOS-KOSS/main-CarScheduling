#!/bin/bash

cd $PWD/car-detection/car-detection_app
npm install
npm run pack-p

cd ../car-detection_service
npm install

cd ..
ares-package car-detection_app/dist car-detection_service
ares-install com.cardetection.app_0.0.1_all.ipk