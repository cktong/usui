'use strict';

angular.module('usuiApp')
  .controller('ReportsCtrl', function ($scope, chartsdb) {
    $scope.chartsdb = chartsdb;
    $scope.scenarioPort = function(port) {
        return function( item ) {
            return item.doc.port == port;
        };
    }
  });

angular.module('usuiApp')
    .controller('reportsCellCtrl', function ($scope, usimpandas) {
        $scope.chart = $scope.chart.doc;
        $scope.height = 250;
        $scope.init = function(scenario) {
            $scope.chart['table'] = scenario+'_'+$scope.chart['table'].split('_').pop()
            usimpandas.query($scope.chart,$scope);
        }
    });
