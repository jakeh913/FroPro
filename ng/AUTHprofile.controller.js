(function() {
  
ngApp.controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData', '$scope', 'postingService'];
  function profileCtrl($location, meanData, $scope, postingService) {
    $scope.vm = this;

    $scope.vm.user = {};
	console.log('made it here2!!')

    meanData.getProfile()
      .success(function(data) {
        $scope.vm.user = data;
		console.log($scope.vm);
      })
      .error(function (e) {
        console.log(e);
      });

    postingService.postingFetch()
	.then(function(response){
	    return $scope.postings = response.data;
	})
  }

})();
