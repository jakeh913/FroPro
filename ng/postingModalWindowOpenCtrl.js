ngApp.controller('ModalDemoCtrl', function ($scope, $uibModal, $log, postingService, $location, meanData, reverseGeocodingService, $http) {
	var revGeocodeAndPost = function(val) {
	    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
		params: {
		address: val,
		sensor: false
		}
	})
	.then(function(response){
		meanData.getProfile().success(function(r){
		    postingService.postingPost( {
			title: $scope.data.jobTitle,
			postingBody: $scope.data.html,
			loc: $scope.data.loc,
			locationLat: response.data.results[0].geometry.location.lat,
			locationLng: response.data.results[0].geometry.location.lng,
			awaitingMod: 1,
			postStatus: 1,
			userPosted: r.email 
		    })
		    .success(function(response){
			var modalInstance = $uibModal.open({
			    templateUrl: '/template/postingModalTemplate.html',
			    controller: 'ModalInstanceCtrl'
			});
			return $location.path('/');
		    })
		    .error(function(e){
			console.log("Error posting to DB:" + e);
		    });
		})
		.error(function(e){
		    console.log(e);
		    postingService.postingPost({
		    	title: $scope.data.jobTitle,
			postingBody: $scope.data.html,
			loc: $scope.data.loc,
			locationLat: response.data.results[0].geometry.location.lat,
			locationLng: response.data.results[0].geometry.location.lng,
			awaitingMod: 1,
			postStatus: 1,
			userPosted: "Not authenticated"
		    })
		    .success(function(response){
			var modalInstance = $uibModal.open({
			    templateUrl: '/template/postingModalTemplate.html',
			    controller: 'ModalInstanceCtrl'
			});
			return $location.path('/');
		    })
		    .error(function(e){
			console.log("Error posting to DB:" + e);
		    });
		});
	})
};  

$scope.animationsEnabled = true;
$scope.open = function () {
    revGeocodeAndPost($scope.data.loc);
};


  



});
