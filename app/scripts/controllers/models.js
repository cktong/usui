'use strict';

angular.module('usuiApp')
    .controller('ModelsCtrl', function ($scope, $location, modelsdb) {
        modelsdb.list($scope);
        $scope.modelsdb = modelsdb;

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