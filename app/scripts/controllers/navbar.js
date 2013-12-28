/**
 * Created by ffoti on 12/26/13.
 */
'use strict';

angular.module('usuiApp')
    .controller('navbarCtrl', function ($scope, $location) {
        $scope.isActive = function(viewLocation) { return ($location.path().indexOf(viewLocation) != -1); };
    });