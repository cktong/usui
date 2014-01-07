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

    function setid($scope,id) {
        $scope.activeID = id;
        $scope.info = $.grep($scope.list, function( a ) { return a.id == id; })[0];
    }

    $scope.showTable = "list";
    $scope.showDetails = function(id) {
        setid($scope,id);
        $scope.showTable = "details";
    }
    $scope.showSampleRows = function(id,orderby) {
        setid($scope,id);

        var descending = ($scope.sorted && $scope.sorted == orderby) ? !$scope.descending : false;
        $scope.sorted = orderby;
        $scope.descending = descending;

        //{"$and":[{"_node_id":{"$lt":1000}},{"_node_id":{"$gt":600}}]}

        bamboo.show(id,$scope,NUMSAMPLEROWS,orderby,descending,$scope.filterQuery);
        $scope.showTable = "sampleRows";
    }
    $scope.showSummary = function(id) {
        setid($scope,id);
        bamboo.summary(id,$scope);
        $scope.showTable = "summary";
    }
  });
