# cityAQ
[![Build Status](https://travis-ci.org/jackkoppa/cityaq.svg?branch=master)](https://travis-ci.org/jackkoppa/cityaq)
[![Coverage Status](https://coveralls.io/repos/github/jackkoppa/cityaq/badge.svg?branch=master)](https://coveralls.io/github/jackkoppa/cityaq?branch=master)
## Background
Angular PWA to compare simple air quality data for different cities, using the [OpenAQ](https://openaq.org/) API. A quick, mobile-first reference for current air quality information around the world, with native-like ease of use & offline availability. 
* Strongly typed OpenAQ API implementation using TypeScript
* Service Workers for moderate offline usage & adherence to [PWA guidelines](https://developers.google.com/web/progressive-web-apps/) (users prompted to install web app on Android browsers)
* Angular Material for UI components
* Google Static Maps API for location images
* Modularized Sass for styling

## Running Locally
### Install
* Node.js & npm ([link](https://nodejs.org/en/download/))

### Run
```shell
npm install -g @angular/cli
git clone https://github.com/jackkoppa/cityaq.git
cd cityaq
npm install
ng serve
```

Livereloading dev server now available at `http://localhost:4200/`

### Run w/ Service Worker
Since the Angular [`ServiceWorkerModule`](https://angular.io/api/service-worker/ServiceWorkerModule) cannot be tested using the normal Webpack dev server, run the steps above, but instead of `ng serve`, run:
```shell
npm install -g http-server
npm run sw-build
cd dist
http-server -p 8080
```
Server now available at `http://localhost:8080/`, without livereload

## Contributors
Big thanks to [RobertImbrie](https://github.com/RobertImbrie) & [hegotgame](https://github.com/hegotgame) for their help in getting the project started @ Rokkincat's Hack & Tell on Oct. 21, 2017.
