'use strict';

angular.module('usuiApp')
    .controller('ChartCtrl', function ($scope, $stateParams, usimpandas) {

        $scope.chart = $scope.chartsdb.getchartbyind($stateParams.id);
        $scope.id = $stateParams.id;
        usimpandas.query($scope.chartsdb.getchartbyind($scope.id),$scope);

        // this function deals with the case where we're reloading a page directly to a chart
        $scope.$on('rowsLoaded', function () {
            $scope.chart = $scope.chartsdb.getchartbyind($stateParams.id);
            usimpandas.query($scope.chartsdb.getchartbyind($scope.id),$scope);
        });

        $scope.editChart = function () {
            $scope.isEditing = true;
        }
        $scope.saveLocally = function () {
            $scope.isEditing = false;
        }
        $scope.saveToDB = function (ind) {
            $scope.isEditing = false;
            $scope.chartsdb.saveind(ind);
        }
    });
