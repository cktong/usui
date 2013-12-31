'use strict';

angular.module('usuiApp')
  .service('chartsdb', function ($rootScope, cornercouch) {
    var chartsdb = cornercouch("http://localhost:5984","GET").getDB("charts");

    chartsdb.queryAll({include_docs: true})
        .success(function () { $rootScope.$broadcast('rowsLoaded'); })
        .error(function (e) {
            growl("error","Error","Database query failed.");
        });

    chartsdb.saveind = function(ind) {
        this.getobjbyind(ind).save()
            .success(function() {
                growl("success","Success","Database update successful.");
            })
            .error(function() {
                growl("error","Error","Database update failed.");
        });
    }

    chartsdb.newchart = function() {
        this.newDoc({desc:"New chart"})
            .save()
            .success(function() {
                growl("success","Success","New document created.");
                chartsdb.queryRefresh();
            })
            .error(function() {
                growl("error","Error","New document failed.");
            })
    }

    chartsdb.deletechart = function(ind) {
        this.getobjbyind(ind)
            .remove()
            .success(function () {
                growl("success","Success","Document deleted.");
                chartsdb.queryRefresh();
            })
            .error(function() {
                growl("error","Error","Document delete failed.");
            })
    }

    chartsdb.getchartbyind = function(ind) {
        var arr = $.grep(this.rows,function(a) {return a.id == ind;});
        if(arr.length == 0) {
            // somtimes this is ok if you're accessing a chart directly
            // growl("error","Error","Chart not found.");
            return;
        }
        return arr[0].doc;
    }

    chartsdb.getobjbyind = function(ind) {
        return this.newDoc(this.getchartbyind(ind));
    }

    return chartsdb;
});
