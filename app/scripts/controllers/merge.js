/**
 * Created by ffoti on 1/20/14.
 */
$scope.mergeTables = function () {
    $scope.merge_type = 'inner'; // default merge type
    usimpandas.merge($scope.estimation_table,$scope,$scope.estimation_merge_table,$scope.left_join_fld,$scope.right_join_fld,$scope.merge_type);

    $scope.fetchData = function () {
        usimpandas.download($scope,$scope.urlToFetch,$scope.urlToFetchOutName)
    }
    $scope.$watch('estimation_table', function() {
        if($scope.estimation_table != undefined) usimpandas.columns($scope.estimation_table,$scope,"left_fields");
    });
    $scope.$watch('estimation_merge_table', function() {
        if($scope.estimation_merge_table != undefined) usimpandas.columns($scope.estimation_merge_table,$scope,"right_fields");
    });
}