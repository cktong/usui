'use strict';

angular.module('usuiApp')
    .service('bamboo', function ($http, $rootScope) {
        $rootScope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        return {
            root: "http://localhost:8080/",
            list: function($scope) {
                this.query(this.root+"datasets?callback=JSON_CALLBACK","list",$scope)
            },
            info: function (id,$scope) {
                this.query(this.root+"datasets/"+id+"/info?callback=JSON_CALLBACK","info",$scope)
            },
            summary: function (id,$scope) {
                this.query(this.root+"datasets/"+id+"/summary?callback=JSON_CALLBACK&select=all","summary",$scope)
            },
            show: function (id,$scope,limit) {
                this.query(this.root+"datasets/"+id+"?callback=JSON_CALLBACK&limit="+limit,"show",$scope)
            },
            query: function (url,attr,$scope) {
                $http.jsonp(url,{timeout: 5000})
                    .success(function (data) {
                        console.log(data);
                        $scope.safeApply(function() {$scope[attr] = data;} );
                    })
                    .error(function (data, status) {
                        growl("error","Bamboo query failed",status);
                    });

            }
        }
    });