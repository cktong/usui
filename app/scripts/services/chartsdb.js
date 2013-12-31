'use strict';

angular.module('usuiApp')
  .service('chartsdb', function ($rootScope, cornercouch) {
    var chartsdb = cornercouch("http://localhost:5984","GET").getDB("charts");

    chartsdb.queryAll({include_docs: true})
        .success(function () { $rootScope.$broadcast('rowsLoaded'); })
        .error(function (e) {console.log(e)});

    chartsdb.getchartbyind = function(ind) {
        if(ind<this.rows.length) return this.rows[ind].doc;
    }
    chartsdb.getobjbyind = function(ind) {
        if(ind<this.rows.length) return this.getQueryDoc(ind);
    }
    return chartsdb;
});
