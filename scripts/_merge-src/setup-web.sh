#!/usr/bin/env bash
# web/_recon を常に再構築（vite build が web/ を消すため）
set -e
cd "$(dirname "$0")/../.."
mkdir -p web/_recon/js
cp -r /home/user/models/inbound-raw/787-exterior/* web/_recon/ 2>/dev/null || { echo "MISSING /tmp/inbound/7au468lb70jrc998"; exit 1; }
cp public/cockpit.glb web/_recon/cockpit.glb
cp node_modules/three/build/three.module.js web/_recon/js/
cp node_modules/three/examples/jsm/loaders/GLTFLoader.js web/_recon/js/
cp node_modules/three/examples/jsm/exporters/GLTFExporter.js web/_recon/js/
cp -r node_modules/three/examples/jsm/utils web/_recon/utils
cp scripts/_merge-src/merge.html web/_recon/merge.html
echo "_recon ready"
