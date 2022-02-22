#!/bin/bash

linkLibs=${1:-no-link}

npm run build
(cd dist && npm link && cd -)
if [[ $linkLibs == "link" ]]; then
  for pk in react @mui/material @mui/icons-material react-hook-form lodash; do
    (cd node_modules/$pk && npm link && cd -)
  done
fi
cd example
npm link react react-dom @mui/material @mui/icons-material react-hook-form lodash @hungphongbk/vth-sdk
npm run dev