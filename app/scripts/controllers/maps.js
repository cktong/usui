'use strict';

angular.module('usuiApp')
	.controller("MapsCtrl", function($scope, usimpandas){

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

	    usimpandas.list($scope)

		var url= "http://localhost:8765/datasets/apartments?callback=JSON_CALLBACK&limit=100&query=&groupby=City&metric=sum()&page=1" 

		usimpandas.query(url, "show", $scope)

		//setInterval(function(){console.log($scope.show)}, 3000)
    });
