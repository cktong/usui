'use strict';

angular.module('usuiApp')
  .service('modelsdb', function ($rootScope, cornercouch) {
    var svr = cornercouch("https://urbansim.cloudant.com","JSONP");
    //svr.login('urbansim','Visua1ization');
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
});
