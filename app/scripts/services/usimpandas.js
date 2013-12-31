'use strict';

angular.module('usuiApp')
    .service('usimpandas', function Usimpandas() {
        return {
            query: function (req,$scope) {
            if(req === undefined) return;
            var port = req['port'];

            $.ajax({
                url: "http://paris.urbansim.org:"+port+"/query?callback=?&json=" + JSON.stringify(req),
                dataType: "jsonp",
                contentType: "application/json;charset=utf-8",
                timeout: 5000,
                success: function (data) {
                    if ('error' in data) {
                        growl("error","Chart query failed",data['error'],true);
                        console.log(JSON.stringify(req));
                        return;
                    }
                    $scope.chartData = [{
                        "key": req["name"],
                        "values": data['records']
                    }];
                    $scope.toolTipContentFunction = function() {return function(key,x,y,e,graph) {return '<p>'+y+'</p>';}}
                    $scope.$apply();
                },
                error: function (data, status) {
                    growl("error","Ajax query failed",status);
                    console.log(JSON.stringify(req));
                }
            });
        }
    }
});
