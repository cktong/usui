'use strict';

/*
    get dthree_chart to work

    try charts in bamboo (else get specs from couchdb)

    load charts from database
    save to database

    reports page
 */

  angular.module('usuiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/main.html',
        controller:'MainCtrl'
      })
      .state('charts', {
        url: '/charts',
        templateUrl: 'views/charts.html',
        controller: 'ChartsCtrl'
      })
      .state('charts.chart', {
        url: '/{id}',
        templateUrl: 'views/chart.html',
        controller: 'ChartCtrl'
      })
      .state('reports', {
        url: '/reports',
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl'
      })
  })




