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
    $scope.selectedFieldsTransform = {};
    $scope.transformations = ['None','np.log','np.log1p','np.log10','np.exp','np.sqrt','np.square','np.reciprocal','np.absolute','np.floor','np.ceil'];
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
    function updatePatsyModel() {
        $scope.patsyModel = $scope.dep_var_transform + "(" + $scope.dep_var + ") ~ " +
            $.grep(Object.keys($scope.selectedFields),function (v) {return $scope.selectedFields[v];})
                .map(function(x){return x in $scope.selectedFieldsTransform && $scope.selectedFieldsTransform[x] != "None"
                    ? $scope.selectedFieldsTransform[x]+"("+x+")" : x})
                .join('+') + ($scope.patsyAddOn?"+"+$scope.patsyAddOn:"");
    }
    $scope.$watchCollection('selectedFields', function () {
        updatePatsyModel();
    })
    $scope.$watchCollection('selectedFieldsTransform', function () {
        updatePatsyModel();
    })
    $scope.$watch('dep_var+dep_var_transform+patsyAddOn', function () {
        updatePatsyModel();
    })

    $scope.setActiveTable = function(tbl) {
        $scope.activeID = tbl;
        $scope.showSampleRows(tbl);
        $scope.showSummary(tbl);
    };
    $scope.sigColor = function(val) {
        if(val< 0) val *= -1; // I don't have internet right now ;)
        if(val > 1.96) return 'Green';
        else if(val > 1.64) return 'Yellow';
        return 'Red';
    }

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
        if($scope.patsyModel) {
            bamboo.patsymodel($scope,$scope.patsyModel,$scope.activeID,"hedonicmodel");
        } else {
            bamboo.model($scope,$scope.selectedFields,$scope.activeID,"hedonicmodel",$scope.dep_var,$scope.dep_var_transform,$scope.output_transform);
        }
        $scope.modelResultsON = true;
    }
    $scope.mergeTables = function () {
        bamboo.merge($scope.estimation_table,$scope,$scope.estimation_merge_table,$scope.left_join_fld,$scope.right_join_fld,$scope.merge_type)
    }
    $scope.showSampleRows = function(id,orderby,descending,count,page) {
        $scope.sorted = orderby;
        $scope.descending = descending;
        count = count === undefined ? NUMSAMPLEROWS : count;
        page = page === undefined ? 1 : page;

        bamboo.show(id,$scope,count,orderby,descending,$scope.filterQuery,$scope.groupBy,$scope.metric,page);
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
        total: 1000, // length of data
        getData: function ($defer, params) {
            var k = Object.keys(params.sorting());
            $scope.safeApply(function() {$scope.tableParams.reloadPages();});

            if (k.length) {
                $scope.showSampleRows($scope.activeID, k[0], params.sorting()[k] == 'desc', params.count(), params.page());
            } else {
                $scope.showSampleRows($scope.activeID, undefined, undefined, params.count(), params.page());
            }
        }
    });
});
