'use strict';

angular.module('usuiApp')
    .controller('ChartCtrl', function ($scope, $stateParams) {

        $scope.chart = $scope.chartsdb.getchartbyind($stateParams.id);
        $scope.id = $stateParams.id;

        // this function deals with the case where we're reloading a page directly to a chart
        $scope.$on('rowsLoaded', function () {
            $scope.chart = $scope.chartsdb.getchartbyind($stateParams.id);
        });

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
