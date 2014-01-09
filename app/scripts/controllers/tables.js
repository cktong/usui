'use strict';

angular.module('usuiApp')
  .controller('TablesCtrl', function ($scope,bamboo,usimpandas) {
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

    var bamboo = usimpandas;
    var NUMSAMPLEROWS = 10;
    $scope.descending = false;
    $scope.filterQuery = '';
    bamboo.list($scope);

    $scope.setActiveTable = function(tbl) {
        $scope.activeID = tbl;
        $scope.showSampleRows(tbl);
        $scope.showSummary(tbl);
    };

    $scope.addFldToQuery = function(fld) {
        $scope.filterQuery += "x['" + fld + "']"
        $('#filterQueryInput').focus();
    }
    $scope.addNumToQuery = function(fld) {
        $scope.filterQuery += fld
        $('#filterQueryInput').focus();
    }
    $scope.addStrToQuery = function(fld) {
        $scope.filterQuery += "'" + fld + "'"
        $('#filterQueryInput').focus();
    }
    $scope.isNumber = function (value) {
        return angular.isNumber(value);
    };

    $scope.showSampleRows = function(id,orderby,descending) {
        $scope.sorted = orderby;
        $scope.descending = descending;

        bamboo.show(id,$scope,NUMSAMPLEROWS,orderby,descending,$scope.filterQuery,$scope.groupBy,$scope.metric);
        $scope.sampleRowsON = true;
    }
    $scope.showSummary = function(id) {
        bamboo.summary(id,$scope);
        $scope.summaryON = true;
    }
    $scope.setActiveTable("homesales");
  });
