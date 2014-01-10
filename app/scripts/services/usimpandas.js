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
            merge: function(left,$scope,right,lefton,righton,how) {
                if(lefton === undefined) lefton = "index";
                if(righton === undefined) righton = "index";
                var out = "tmptbl";
                this.query(this.root+"merge_datasets/"+left+"/"+right+"/"+lefton+"/"+righton+"/"+how+"/"+out+"?callback=JSON_CALLBACK","list",$scope)
            },
            model: function($scope) {
                var req =
                {
                    "table": "dset.fetch('homesales')",
                    "model": "hedonicmodel",
                    "dep_var": "Sale_price_flt",
                    "ind_vars": [
                        "Lot_size",
                        "SQft",
                        "Year_built"
                    ],
                    "add_constant": true,
                    "output_names": [
                        "coeff-reshedonic-rent.csv",
                        "RESIDENTIAL HEDONIC MODEL (RENT)",
                        "residential_rent",
                        "residential_rent"
                    ],
                    "output_transform": "np.exp"
                };

                this.query(this.root+"execmodel?callback=JSON_CALLBACK&json=" + JSON.stringify(req),"list",$scope);
            },
            list: function($scope) {
                this.query(this.root+"datasets?callback=JSON_CALLBACK","list",$scope)
            },
            info: function (id,$scope) {
                this.query(this.root+"datasets/"+id+"/info?callback=JSON_CALLBACK","info",$scope)
            },
            columns: function (id,$scope,targetvar) {
                this.query(this.root+"datasets/"+id+"/columns?callback=JSON_CALLBACK",targetvar,$scope)
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