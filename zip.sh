#!/bin/bash
set -eo pipefail

cd ./dist && zip -r paperspace-monitor ./ && mv paperspace-monitor.zip ../
echo "READ ME: DID YOU BUMP THE VERSION NUMBER IN THE MANIFEST.JSON?"
