'use strict';

angular.module('usuiApp')
    .controller('ModelCtrl', function ($scope, globals, $stateParams, usimpandas) {
        $scope.modelsdb.getbyind($stateParams.id,$scope);
        $scope.id = $stateParams.id;


        // this function deals with the case where we're reloading a page directly to a chart
        /*$scope.$on('rowsLoaded', function () {
            $scope.model = $scope.modelsdb.getbyind($stateParams.id);
        });*/

        $scope.editModel = function () {
            $scope.isEditing = true;
        }
        $scope.compileModel = function () {
            console.log($scope.model);
            $scope.modelsdb.compile($scope.model,$scope);
        }
        $scope.estimateModel = function () {
            $scope.modelResultsON = true;
            usimpandas.modeldoc($scope,$scope.model,1,0);
        }
        $scope.simulateModel = function () {
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
