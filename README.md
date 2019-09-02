# Header/Footer for Mendix developer websites

[![Build Status](https://secure.travis-ci.org/mendix/mx-developer.png?branch=master)](https://travis-ci.org/mendix/mx-developer)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). We ejected it for changing webpack configuration.

## URL

Following are the URL's where the scripts are hosted per environment.

-   Test: <https://mx-developer-test.cfapps.io/>
-   Production: <https://developer-static.mendix.com/>

## Add Header and Footer to your app

-   Add `<script src="${URL for test or production}/mx-header.js"></script>` in your html file, depending on your environment (see [Hosting URL's](#URL)).
-   Create a container with css class `mxHeader` at the top of your layout.
-   Create a container with css class `mxFooter` at the bottom of your layout.
