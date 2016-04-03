ngApp.controller('postingDetailCtrl', function($scope, postingService, $routeParams){
    postingService.fetchSinglePosting($routeParams.id)
    .success(function(response){
	return $scope.postingDetail = response
    })
    .error(function(e){
	console.log(e);
    });
});
