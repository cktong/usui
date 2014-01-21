'use strict';

angular.module('usuiApp')
    .controller('ModelCtrl', function ($scope, globals, $stateParams, usimpandas) {
        $scope.model = $scope.modelsdb.getbyind($stateParams.id);
        $scope.id = $stateParams.id;

        // this function deals with the case where we're reloading a page directly to a chart
        $scope.$on('rowsLoaded', function () {
            $scope.model = $scope.modelsdb.getbyind($stateParams.id);
        });

        $scope.editModel = function () {
            $scope.isEditing = true;
        }
        $scope.estimateModel = function () {
            $scope.model["var_lib_db"] = "bayarea_models";
            $scope.modelResultsON = true;
            usimpandas.modeldoc($scope,$scope.model,1,0);
        }
        $scope.simulateModel = function () {
            $scope.model["var_lib_db"] = "bayarea_models";
            $scope.modelResultsON = true;
            usimpandas.modeldoc($scope,$scope.model,0,1);
        }
        $scope.saveLocally = function () {
            $scope.isEditing = false;
        }
        $scope.saveToDB = function (ind) {
            $scope.isEditing = false;
            $scope.modelsdb.saveind(ind);
        }
    });
