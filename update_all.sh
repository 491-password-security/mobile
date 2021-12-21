#!/bin/bash
ncu -u
npm install
cd ios
pod update
pod install
