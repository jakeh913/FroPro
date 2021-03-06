ngApp.controller('adminEditPostingCtrl', function adminEditPostingCtrl($scope, $routeParams, postingService, $http, meanData) {
    postingService.fetchSinglePosting($routeParams.id)
    .success(function(response){
	return $scope.adminPostingEditDetail = response
    })
    .error(function(e){
	console.log(e);
    });

   /* meanData.getProfile()
      .success(function(data){console.log("get Profile has populated headers?")} )
      .error(function (e) {
        console.log(e);
      })*/


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
