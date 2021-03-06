'use strict';

angular.module('usuiApp')
	.controller("MapsCtrl", ["$scope", function($scope, $http, usimpandas){

	    angular.extend($scope, {
	        sanfrancisco: {
	            lat: 37.79,
	            lng: -122.4,
	            zoom: 17
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
		        	},
	        	}
	        ,	
			overlays: {
	                Roads:{
	                	name:'Roads',
	                	type: 'geoJSON',
	                	url: 'http://tile.openstreetmap.us/vectiles-skeletron/{z}/{x}/{y}.json',
	                	visible:true,
	                	layerOptions: {
	                        	style: {
							        "color": "#DD0000 ",
							        "fillColor": "#DD0000",
							        "weight": 1.0,
							        "fillOpacity": .4
							    },
	                        },
	                    pluginOptions:{
	                    	cliptiles: false
	                    }
	                }
	                ,
	                hillshade: {
				        name: 'Hillshade Europa',
				        type: 'wms',
				        url: 'http://129.206.228.72/cached/hillshade',
				        visible: true,
				        layerOptions: {
				            layers: 'europe_wms:hs_srtm_europa',
				            format: 'image/png',
				            opacity: 0.25,
				            attribution: 'Hillshade layer by GIScience http://www.osm-wms.de',
				            crs: L.CRS.EPSG900913
				        }
				    }
	        	}
	        }
	    })

		$scope.tiles = {
		    url: "http://paris.urbansim.org:8763/bayarea/{z}/{x}/{y}.geojson"
		}

		console.log($scope.layers)

	    // usimpandas.list($scope)

		// var url= "http://localhost:8765/datasets/apartments?callback=JSON_CALLBACK&limit=100&query=&groupby=City&metric=sum()&page=1" 

		// usimpandas.query(url, "show", $scope)

		//setInterval(function(){console.log($scope.show)}, 3000)
    }]);
