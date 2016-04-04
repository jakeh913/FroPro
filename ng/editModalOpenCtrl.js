ngApp.controller('editModalOpenCtrl', function ($scope, $uibModal, $log, postingService, $location, meanData, reverseGeocodingService, $http) {
	var revGeocodeAndPost = function(val) {
	    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
		params: {
		address: val,
		sensor: false
		}
	})
	.then(function(response){
		meanData.getProfile()
		.success(function(r){
		    postingService.postingPost( {
			title: $scope.editPostingDetail.title,
			postingBody: $scope.editPostingDetail.postingBody,
			loc: $scope.editPostingDetail.loc,
			locationLat: response.data.results[0].geometry.location.lat,
			locationLng: response.data.results[0].geometry.location.lng,
			awaitingMod: 1,
			postStatus: 1,
			userPosted: r.email,
			userID: r._id,
			jobUniqueID: $scope.editPostingDetail.jobUniqueID,
			version: $scope.editPostingDetail.version + 1
		    })
		    .success(function(response){
			var modalInstance = $uibModal.open({
			    templateUrl: '/editPostingModalTemplate.html',
			    controller: 'ModalInstanceCtrl'
			});
			return $location.path('/profile');
		    })
		    .error(function(e){
			console.log("Error posting to DB:" + e);
		    });
		})
		.error(function(e){
		    console.log(e)
		})
	});
	};

$scope.animationsEnabled = true;
$scope.open = function () {
    revGeocodeAndPost($scope.editPostingDetail.loc);
};

});  

  



