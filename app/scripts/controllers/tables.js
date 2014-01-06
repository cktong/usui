'use strict';

angular.module('usuiApp')
  .controller('TablesCtrl', function ($scope,bamboo) {
    $scope.activateField = function (field) {
        $scope.activeField = {
            label: field,
            height: 200,
            chartData: [{
                "key":"key",
                "values": [
                    [0,$scope.summary[field].summary.min],
                    [1,$scope.summary[field].summary["25%"]],
                    [2,$scope.summary[field].summary["50%"]],
                    [3,$scope.summary[field].summary["75%"]],
                    [4,$scope.summary[field].summary.max]
                ]
            }]
        };
    };

    var NUMSAMPLEROWS = 8;
    bamboo.list($scope);

    $scope.showTable = "details";
    $scope.showDetails = function(id) {
        bamboo.info(id, $scope);
        $scope.showTable = "details";
    }
    $scope.showSampleRows = function(id) {
        bamboo.show(id,$scope,NUMSAMPLEROWS);
        $scope.showTable = "sampleRows";
    }
    $scope.showSummary = function(id) {
        bamboo.summary(id,$scope);
        $scope.showTable = "summary";
    }
  });
