'use strict';

angular.module('usuiApp')
  .controller('TablesCtrl', function ($scope,bamboo) {
        $scope.byPort = function(port) { return function( item ) {
            console.log(port);
            return item.doc.port == port;
        };
        }

    var id = 'dd02c11d14964f3482b300239c16bd2f';
    bamboo.info(id,$scope);
    bamboo.summary(id,$scope,10000);
    bamboo.show(id,$scope,8);

    $scope.showTable = "details";
    $scope.showDetails = function() {$scope.showTable = "details";}
    $scope.showSampleRows = function() {$scope.showTable = "sampleRows"}
    $scope.showSummary = function() {$scope.showTable = "summary"}
  });
