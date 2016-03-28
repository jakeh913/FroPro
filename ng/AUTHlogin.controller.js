(function () {

ngApp.controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', '$scope', 'authentication'];
  function loginCtrl($location, $scope, authentication) {
    $scope.vm = this;

    $scope.vm.credentials = {
      email : "",
      password : ""
    };

    $scope.vm.onSubmit = function () {
		console.log('made it here')
      authentication
        .login($scope.vm.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('/');
        });
    };

  }

})();