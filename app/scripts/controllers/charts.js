'use strict';

angular.module('usuiApp')
  .controller('ChartsCtrl', function ($scope,$location) {
    $scope.charts = [{
         id: '1',
         name: 'chart1',
         "orderby": 2,
         "desc": "Residential Units",
         "table": "buildings2010",
         "groupby": 1,
         "fields": "building_type_id, sum(residential_units)",
         "limit": "",
         "jointoparcels": true,
         "orderdesc": false
         }, {
         'id': '2',
         'name': 'chart2',
         "desc": "Non-residential sqft",
         "orderby": 2,
         "table": "buildings2010",
         "filter": "building_type_id > 3 and zone_id = 550",
         "groupby": 1,
         "fields": "building_type_id, sum(building_sqft)",
         "limit": "",
         "jointoparcels": true,
         "orderdesc": false
         }, {
         'id': '3',
         'name': 'chart3',
         "desc": "Zones with largest parcels",
         "orderby": 2,
         "table": "parcels2010_withgeography",
         "filter": "shape_area > 4000",
         "groupby": 1,
         "fields": "zone_id, count(shape_area)",
         "limit": "5",
         "jointoparcels": false,
         "orderdesc": true
         }];
        $scope.locationEquals = function(path) {
            return $location.path() == path;
        }
        $scope.newChart = function() {
            $scope.charts.push({desc: "New chart",id: '4'});
        }
        $scope.deleteChart = function(index) {
            $scope.charts.splice(index,1);
        }
  });
