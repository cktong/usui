/**
 * Created by ffoti on 1/20/14.
 */
$scope.activateField = function (field) {
    $scope.activeField = {
        label: field,
        height: 200,
        chartData: [{
            "key":"key",
            "values": [
                [0,$scope.summary[field].summary.min],
                [1,$scope.summary[field].summary["25%"]],
                [2,$scope.summary[field].summary["50%"]],
                [3,$scope.summary[field].summary["75%"]],
                [4,$scope.summary[field].summary.max]
            ]
        }]
    };
};
