ngApp.controller('ModalDemoCtrl', function ($scope, $uibModal, $log, postingService, $location, reverseGeocodingService, $http) {

var revGeocodeAndPost = function(val) {
	return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
		params: {
		address: val,
		sensor: false
		}
	})
	.then(function(response){
		$scope.locationResults = response.data.results;
	})
	.then(function(data){
		postingService.postingPost( {
			title: $scope.data.jobTitle,
			postingBody: $scope.data.html,
			loc: $scope.data.loc,
			locationLat: $scope.locationResults[0].geometry.location.lat,
			locationLng: $scope.locationResults[0].geometry.location.lng,
			awaitingMod: 1,
			postStatus: 1
		});
	})
	.then(function(){
		var modalInstance = $uibModal.open({
			templateUrl: '/template/postingModalTemplate.html',
			controller: 'ModalInstanceCtrl'
		});
		console.log($scope.locationResults);					
		return $location.path('/');
	});								
};  

$scope.animationsEnabled = true;
$scope.open = function () {

	revGeocodeAndPost($scope.data.loc);

};


  



});