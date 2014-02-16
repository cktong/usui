'use strict';

  angular.module('usuiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'truncate',
  'CornerCouch',
  'pascalprecht.github-adapter',
  'nvd3ChartDirectives',
  'ngTable',
  'leaflet-directive'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

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
      .state('/tables', {
        url: '/tables',
        templateUrl: 'views/tables.html',
        controller: 'TablesCtrl'
      })
      .state('/maps', {
        url: '/maps',
        templateUrl: 'views/maps.html',
        controller: 'MapsCtrl'
      })
      .state('/visualmodeler', {
        url: '/visualmodeler',
        templateUrl: 'views/visualmodeler.html',
        controller: 'TablesCtrl'
      })
      .state('/models', {
        url: '/models',
        templateUrl: 'views/models.html',
        controller: 'ModelsCtrl'
      })
      .state('/models.model', {
        url: '/{id}',
        templateUrl: 'views/model.html',
        controller: 'ModelCtrl'
      })
      .state('/simulations', {
        url: '/simulations',
        templateUrl: 'views/simulations.html',
        controller: 'SimulationsCtrl'
      })

  })

// message growler
function growl(type,title,text,sticky) {
    sticky = sticky || false;
    $.msgGrowl ({type: type, title: title, text: text, sticky: sticky});
}




