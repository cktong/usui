'use strict';

angular.module('usuiApp')
    .service('usimpandas', function ($http, $rootScope) {
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
            root: "http://localhost:8765/",
            list: function($scope) {
                this.query(this.root+"datasets?callback=JSON_CALLBACK","list",$scope)
            },
            info: function (id,$scope) {
                this.query(this.root+"datasets/"+id+"/info?callback=JSON_CALLBACK","info",$scope)
            },
            summary: function (id,$scope) {
                this.query(this.root+"datasets/"+id+"/summary?callback=JSON_CALLBACK&select=all","summary",$scope)
            },
            show: function (id,$scope,limit,orderby,descending,filter,groupby,metric) {
                if(descending) orderby = "-"+orderby;
                orderby = orderby === undefined ? "" : "&order_by="+orderby;
                filter = filter === undefined ? "" : "&query="+filter;
                groupby = groupby === undefined || metric === undefined ? "" : "&groupby="+groupby;
                metric = groupby === undefined || metric === undefined ? "" : "&metric="+metric;
                this.query(this.root+"datasets/"+id+"?callback=JSON_CALLBACK&limit="+limit+orderby+filter+groupby+metric,"show",$scope)
            },
            query: function (url,attr,$scope) {
                console.log(url);
                $http.jsonp(url,{timeout: 5000})
                    .success(function (data) {
                        console.log(data);
                        $scope.safeApply(function() {$scope[attr] = data;} );
                    })
                    .error(function (data, status) {
                        growl("error","Koala query failed",status);
                    });

            }
        }
    });