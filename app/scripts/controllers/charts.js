'use strict';

angular.module('usuiApp')
    .controller('ChartsCtrl', function ($scope, $location, chartsdb) {

        $scope.chartsdb = chartsdb;

        $scope.locationEquals = function (path) {
            return $location.path() == path;
        }
        $scope.newChart = function () {
            $scope.chartsdb.newchart();
        }
        $scope.deleteChart = function (ind) {
            $scope.chartsdb.deletechart(ind);
        }
    });
