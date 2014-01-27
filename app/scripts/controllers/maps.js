'use strict';

angular.module('usuiApp')
	.controller("MapsCtrl", function($scope, $http, usimpandas){

	    angular.extend($scope, {
	        sanfrancisco: {
	            lat: 37.82,
	            lng: -122.37,
	            zoom: 12
	        },
	        defaults: {
	            scrollWheelZoom: false
	        },
	        layers:{
	        	baselayers: {
		        	osm:{
		        		name: "OpenStreetMap (XYZ)",
		        		type: "xyz",
						url: 'http://{s}.tile.cloudmade.com/1a1b06b230af4efdbb989ea99e9841af/997/256/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            continuousWorld: true
                        }
		        	},
		        	cycle:{
						name: 'OpenCycleMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.opencyclemap.org/copyright">OpenCycleMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            continuousWorld: true
                        }		        		
		        	}
	        	}
	        	// overlays: {
	        	// 	fire: {
	         //                name: 'Borders',
	         //                type: 'xyz',
	         //                url: 'http://paris.urbansim.org:8763/bayarea/{z}/{x}/{y}.geojson',
	         //            }
	        	// }
	        }
	    })

		$scope.tiles = {
		    url: "http://paris.urbansim.org:8763/bayarea/{z}/{x}/{y}.geojson",
		}

	    usimpandas.list($scope)

		var url= "http://localhost:8765/datasets/apartments?callback=JSON_CALLBACK&limit=100&query=&groupby=City&metric=sum()&page=1" 

		usimpandas.query(url, "show", $scope)

		//setInterval(function(){console.log($scope.show)}, 3000)
    });
