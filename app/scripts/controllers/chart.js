'use strict';

angular.module('usuiApp')
    .controller('ChartCtrl', function ($scope, $stateParams) {
        //$scope.chart = $.grep($scope.charts, function(e){ return e.id ==$stateParams.id; })[0];
        $scope.chart = $scope.charts[$stateParams.id];

        $scope.editChart = function () {
            $scope.isEditing = true;
        }
        $scope.saveLocally = function () {
            $scope.isEditing = false;
        }
        $scope.saveToDB = function () {
            $scope.isEditing = false;
        }
    });
