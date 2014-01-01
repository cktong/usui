'use strict';

  angular.module('usuiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'CornerCouch',
  'nvd3ChartDirectives'
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
  })

// message growler
function growl(type,title,text,sticky) {
    sticky = sticky || false;
    $.msgGrowl ({type: type, title: title, text: text, sticky: sticky});
}




