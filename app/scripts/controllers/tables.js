'use strict';

angular.module('usuiApp')
  .controller('TablesCtrl', function ($scope,bamboo,usimpandas,ngTableParams) {
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
    $scope.selectedFields = {};
    $scope.transformations = ['np.log1p','np.exp'];
    $scope.dep_var = "Sale_price_flt";
    $scope.dep_var_transform = "np.log1p";
    $scope.output_transform = "np.exp";
    $scope.merge_type = 'inner';

    $scope.$watch('estimation_table', function() {
        if($scope.estimation_table != undefined) bamboo.columns($scope.estimation_table,$scope,"left_fields");
    });
    $scope.$watch('estimation_merge_table', function() {
        if($scope.estimation_merge_table != undefined) bamboo.columns($scope.estimation_merge_table,$scope,"right_fields");
    });
    $scope.$watch('show', function() {
        if($scope.show != undefined) {
            $scope.safeApply(function() {
                $scope.pages = $scope.tableParams.reloadPages();
                console.log("herenow");
                console.log($scope.pages);
            });
        }
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

    $scope.fetchData = function () {
        bamboo.download($scope,$scope.urlToFetch,$scope.urlToFetchOutName)
    }
    $scope.execModel = function () {
        bamboo.model($scope,$scope.selectedFields,$scope.activeID,"hedonicmodel",$scope.dep_var,$scope.dep_var_transform,$scope.output_transform);
        $scope.modelResultsON = true;
    }
    $scope.mergeTables = function () {
        bamboo.merge($scope.estimation_table,$scope,$scope.estimation_merge_table,$scope.left_join_fld,$scope.right_join_fld,$scope.merge_type)
    }
    $scope.showSampleRows = function(id,orderby,descending,count) {
        $scope.sorted = orderby;
        $scope.descending = descending;
        count = count === undefined ? NUMSAMPLEROWS : count;

        bamboo.show(id,$scope,count,orderby,descending,$scope.filterQuery,$scope.groupBy,$scope.metric);
        $scope.sampleRowsON = true;
    }
    $scope.showSummary = function(id) {
        bamboo.summary(id,$scope);
        $scope.summaryON = true;
    }
    $scope.setActiveTable("homesales");

    $scope.tableParams = new ngTableParams({
        page: 1,             // show first page
        count: NUMSAMPLEROWS // count per page
    }, {
        $scope: $scope,
        total: 1000, // length of data
        getData: function ($defer, params) {
            console.log("running");
            var k = Object.keys(params.sorting());
            if (k.length) {
                $scope.showSampleRows($scope.activeID, k[0], params.sorting()[k] == 'desc', params.count());
            } else {
                $scope.showSampleRows($scope.activeID, undefined, undefined, params.count());
            }
        }
    });
});
