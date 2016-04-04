ngApp.controller('editPostingCtrl', function editPostingCtrl($scope, $routeParams, postingService, $http) {
    postingService.fetchSinglePosting($routeParams.id)
    .success(function(response){
	return $scope.editPostingDetail = response
    })
    .error(function(e){
	console.log(e);
    });

    $scope.getLocation = function(val) {
	return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
		params: {
	 	address: val,
		sensor: false
	}
	}).then(function(response){
		return response.data.results.map(function(item){
		    return item.formatted_address;						
		});
	});
    };
});
