#!/bin/bash

yarn test;

if [[ $TRAVIS_BRANCH == 'development' ]]; then
  yarn build:test;
fi

if [[ $TRAVIS_BRANCH == 'master' ]]; then
  yarn build:prod;
fi
