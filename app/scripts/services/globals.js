/**
 * Created by ffoti on 1/20/14.
 */

'use strict';

angular.module('usuiApp')
    .service('globals', function ($rootScope,$location) {
        $rootScope.transformations = ['None','np.log1p','np.log10','np.exp','np.sqrt','np.square','np.reciprocal','np.absolute','np.floor','np.ceil'];
        $rootScope.aggregations = ['sum()','mean()','max()','min()','quantile()'];
        $rootScope.sigColor = function(val) {
            if(val< 0) val *= -1; // I don't have internet right now ;)
            if(val > 2.57) return 'rgb(89,189,238';
            if(val > 1.96) return 'rgb(119,204,80)';
            else if(val > 1.64) return 'rgb(250,183,49)';
            return 'rgb(255,42,42)';
        }
        $rootScope.isNumber = function (value) {
            return angular.isNumber(value);
        };
        $rootScope.isActive = function(viewLocation) {
            return ($location.path().indexOf(viewLocation) != -1);
        };

    });
