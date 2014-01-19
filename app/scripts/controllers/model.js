'use strict';

angular.module('usuiApp')
    .controller('ModelCtrl', function ($scope, $stateParams) {
        $scope.model = $scope.modelsdb.getbyind($stateParams.id);
        $scope.id = $stateParams.id;

        // this function deals with the case where we're reloading a page directly to a chart
        $scope.$on('rowsLoaded', function () {
            $scope.model = $scope.modelsdb.getbyind($stateParams.id);
        });

        $scope.editModel = function () {
            $scope.isEditing = true;
        }
        $scope.saveLocally = function () {
            $scope.isEditing = false;
        }
        $scope.saveToDB = function (ind) {
            $scope.isEditing = false;
            $scope.modelsdb.saveind(ind);
        }
    });
