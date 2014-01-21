/**
 * Created by ffoti on 1/20/14.
 */

'use strict';

angular.module('usuiApp')
    .service('globals', function ($rootScope) {
        $rootScope.transformations = ['None','np.log1p','np.log10','np.exp','np.sqrt','np.square','np.reciprocal','np.absolute','np.floor','np.ceil'];
        $rootScope.aggregations = ['sum()','mean()','max()','min()','quantile()'];
        $rootScope.sigColor = function(val) {
            if(val< 0) val *= -1; // I don't have internet right now ;)
            if(val > 1.96) return 'Green';
            else if(val > 1.64) return 'Yellow';
            return 'Red';
        }
        $rootScope.isNumber = function (value) {
            return angular.isNumber(value);
        };
    });
