'use strict';

angular.module('usuiApp')
	.controller("MapCtrl", function($http, $scope){

	    angular.extend($scope, {
	        sanfrancisco: {
	            lat: 37.82,
	            lng: -122.37,
	            zoom: 12
	        },
	        defaults: {
	            scrollWheelZoom: false
	        }
	    })

    });
