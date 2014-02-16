'use strict';

angular.module('usuiApp')
  .controller('TablesCtrl', function ($scope,globals,usimpandas,ngTableParams) {

    // model mode allows the estimation of models, otherwise just show tables
    $scope.modelMode = $scope.isActive("visualmodeler");
    $scope.filterQuery = "";

    var NUMSAMPLEROWS = 10; // I'm not totally sure this will work if you change it

    usimpandas.list($scope);

    // when the page loads set the active table to the first one in the list
    $scope.$watch('list', function () {if($scope.list != undefined) $scope.setActiveTable($scope.list[0]);})

    $scope.setActiveTable = function(tbl) {
        $scope.groupBy = undefined;
        $scope.metric = undefined;
        $scope.activeID = tbl;
        $scope.tableParams.sorting({});
        $scope.filterQuery = "";
        $scope.showSampleRows(tbl);
        $scope.showSummary(tbl);
    };

    $scope.addFldToQuery = function(fld) {
        $scope.filterQuery += "x['" + fld + "']"
        $('#filterQueryInput').focus();
    }
    $scope.addNumToQuery = function(fld,ind) {
        $scope.addFldToQuery($scope.show.labels[ind]);
        $scope.filterQuery += "==";
        $scope.filterQuery += fld;
        $('#filterQueryInput').focus();
    }
    $scope.addStrToQuery = function(fld,ind) {
        $scope.addFldToQuery($scope.show.labels[ind]);
        $scope.filterQuery += "==";
        $scope.filterQuery += "'" + fld + "'"
        $('#filterQueryInput').focus();
    }

    $scope.showSampleRows = function(id,orderby,descending,count,page) {
        if(id===undefined) return;
        $scope.sorted = orderby;
        $scope.descending = descending;
        count = count === undefined ? NUMSAMPLEROWS : count;
        page = page === undefined ? 1 : page;

        usimpandas.show(id,$scope,count,orderby,descending,$scope.filterQuery,$scope.groupBy,$scope.metric,page);
        $scope.sampleRowsON = true;
    }
    $scope.showSummary = function(id) {
        usimpandas.summary(id,$scope);
        $scope.summaryON = true;
    }

    // parameters for ng-table
    $scope.tableParams = new ngTableParams({
        page: 1,
        count: NUMSAMPLEROWS
    }, {
        total: 1000, // length of data, this might cause issues
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


    // all model configuration below this

    $scope.selectedFields = {}; // fields for model
    $scope.selectedFieldsTransform = {}; // transformations on fields for model
    $scope.dep_var = "Sale_price_flt"; // output variable for model
    $scope.dep_var_transform = "np.log1p"; // transform of output variable
    $scope.output_transform = "np.exp"; // inverse transform of output variable (for simulation)

    function updatePatsyModel() {
        $scope.patsyModel = "" +
            $.grep(Object.keys($scope.selectedFields),function (v) {return $scope.selectedFields[v];})
                .map(function(x){return x in $scope.selectedFieldsTransform && $scope.selectedFieldsTransform[x] != "None"
                    ? $scope.selectedFieldsTransform[x]+"("+x+")" : x})
                .join(' + ') + ($scope.patsyAddOn?"+"+$scope.patsyAddOn:"");
    }
    $scope.$watchCollection('selectedFields', function () { updatePatsyModel(); })
    $scope.$watchCollection('selectedFieldsTransform', function () { updatePatsyModel(); })
    $scope.$watch('dep_var+dep_var_transform+patsyAddOn', function () { updatePatsyModel(); })

    $scope.execModel = function () {
        if($scope.patsyModel) {
            usimpandas.patsymodel($scope,$scope.patsyModel,$scope.activeID,"hedonicmodel",$scope.dep_var,$scope.dep_var_transform,$scope.output_transform);
        } else {
            usimpandas.model($scope,$scope.selectedFields,$scope.activeID,"hedonicmodel",$scope.dep_var,$scope.dep_var_transform,$scope.output_transform);
        }
        $scope.modelResultsON = true;
    }
});
