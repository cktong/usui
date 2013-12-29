'use strict';

angular.module('usuiApp')
    .controller('ChartsCtrl', function ($scope, $location, chartsdb) {

        $scope.chartsdb = chartsdb;

        $scope.locationEquals = function (path) {
            return $location.path() == path;
        }
        $scope.newChart = function () {
            $scope.chartsdb.newDoc({desc:"New chart"}).save()
            .success(function() {
                $scope.chartsdb.queryRefresh();
            })
        }
        $scope.deleteChart = function (ind) {
            $scope.chartsdb.getobjbyind(ind).remove()
            .success(function () {
                $scope.chartsdb.queryRefresh();
            })
        }
    });
