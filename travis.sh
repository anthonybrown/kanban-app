#!/bin/bash
set -e # exit with nonzero exit code if anything fails

npm i
npm run check_links
npm run lint
