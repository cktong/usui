'use strict';

angular.module('usuiApp')
  .service('modelsdb', function ($http, $rootScope) {
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
        list: function ($scope) {
            this.query(this.root+"configs?callback=JSON_CALLBACK","config_list",$scope);
        },
        getbyind: function(ind,$scope) {
            this.query(this.root+"config/"+ind+"?callback=JSON_CALLBACK","model",$scope);
        },
        compile: function(config,$scope) {
            this.query(this.root+"compilemodel?config="+JSON.stringify(config)+"&callback=JSON_CALLBACK","model_source",$scope);
        },
        query: function (url,attr,$scope) {
            console.log(url);
            $http.jsonp(url,{timeout: 5000})
                .success(function (data) {
                    console.log(data);
                    $scope.safeApply(function() {$scope[attr] = data;} );
                })
                .error(function (data, status) {
                    growl("error","Model configuration query failed",status);
                });

        }
    };
        /*
    var svr = cornercouch("https://urbansim.cloudant.com","JSONP");
    svr.login('urbansim','Visua1ization');
    var modelsdb = svr.getDB("bayarea_models");

    modelsdb.queryAll({include_docs: true})
        .success(function (data) { $rootScope.$broadcast('rowsLoaded'); })
        .error(function (e) {
            growl("error","Error","Database query failed.");
        });

    modelsdb.saveind = function(ind) {
        this.getobjbyind(ind).save()
            .success(function() {
                growl("success","Success","Database update successful.");
            })
            .error(function() {
                growl("error","Error","Database update failed.");
        });
    }

    modelsdb.new = function() {
        this.newDoc({desc:"New chart"})
            .save()
            .success(function() {
                growl("success","Success","New document created.");
                modelsdb.queryRefresh();
            })
            .error(function() {
                growl("error","Error","New document failed.");
            })
    }

    modelsdb.delete = function(ind) {
        this.getobjbyind(ind)
            .remove()
            .success(function () {
                growl("success","Success","Document deleted.");
                modelsdb.queryRefresh();
            })
            .error(function() {
                growl("error","Error","Document delete failed.");
            })
    }

    modelsdb.getbyind = function(ind) {
        var arr = $.grep(this.rows,function(a) {return a.id == ind;});
        if(arr.length == 0) {
            // somtimes this is ok if you're accessing a chart directly
            // growl("error","Error","Chart not found.");
            return;
        }
        return arr[0].doc;
    }

    modelsdb.getobjbyind = function(ind) {
        return this.newDoc(this.getchartbyind(ind));
    }

    return modelsdb;
*/
});
