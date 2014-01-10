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

    $scope.merge_type = 'inner';
    $scope.$watch('estimation_table', function() {
        console.log($scope.estimation_table);
        if($scope.estimation_table != undefined) bamboo.columns($scope.estimation_table,$scope,"left_fields");
    });
    $scope.$watch('estimation_merge_table', function() {
        console.log($scope.estimation_merge_table);
        if($scope.estimation_merge_table != undefined) bamboo.columns($scope.estimation_merge_table,$scope,"right_fields");
    });

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

    $scope.mergeTables = function () {
        bamboo.merge($scope.estimation_table,$scope,$scope.estimation_merge_table,$scope.left_join_fld,$scope.right_join_fld,$scope.merge_type)
    }
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
