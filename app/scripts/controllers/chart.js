'use strict';

angular.module('usuiApp')
    .controller('ChartCtrl', function ($scope, $stateParams) {

        $scope.chart = $scope.chartsdb.getchartbyind($stateParams.id);
        $scope.id = $stateParams.id;

        $scope.editChart = function () {
            $scope.isEditing = true;
        }
        $scope.saveLocally = function () {
            $scope.isEditing = false;
        }
        $scope.saveToDB = function (ind) {
            $scope.isEditing = false;
            $scope.chartsdb.getobjbyind(ind).save();
        }
    });
