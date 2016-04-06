ngApp.controller('adminEditModalApprovalCtrl', function ($scope, $uibModal, $log, postingService, $location, meanData, reverseGeocodingService, $http, testService) {
	var revGeocodeAndPost = function(val, approval) {
	    if (approval === 'approve'){var approve = 1; var postLive = 1}
	    else if (approval === 'disprove'){var approve = 2; var postLive = 2}
	    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
		params: {
		address: val,
		sensor: false
		}
	    })
	.then(function(response){
		    testService.testPost({
			title: $scope.adminPostingEditDetail.title,
			postingBody: $scope.adminPostingEditDetail.postingBody,
			loc: $scope.adminPostingEditDetail.loc,
			locationLat: response.data.results[0].geometry.location.lat,
			locationLng: response.data.results[0].geometry.location.lng,
			awaitingMod: 0,
			postStatus: postLive,
			date: $scope.adminPostingEditDetail.date,
			userPosted: 'publicly hidden',
			userID: $scope.adminPostingEditDetail.userID,
			jobUniqueID: $scope.adminPostingEditDetail.jobUniqueID,
			version: $scope.adminPostingEditDetail.version
		    })
		    .success(function(response){
			var modalInstance = $uibModal.open({
			    templateUrl: '/adminEditPostingModalTemplate.html',
			    controller: 'ModalInstanceCtrl'
			});
			return $location.path('/adminEditDash');
		    })
		    .error(function(e){
			console.log("Error posting to Public Post DB:" + e);
		    });
		})
	};

$scope.animationsEnabled = true;
$scope.approval = function (approval) {
    revGeocodeAndPost($scope.adminPostingEditDetail.loc, approval);
};

});  

  



