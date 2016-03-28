(function () {

ngApp.controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', '$scope','authentication']; //Jake note: added $scope here
  function registerCtrl($location, $scope, authentication) { //Jake note: added $scope here
    $scope.vm = this;//Jake note: added $scope here

    $scope.vm.credentials = {//Jake note: added $scope here
      email : "",
      password : ""
    };

    $scope.vm.onSubmit = function () {//Jake note: added $scope here
      console.log('Submitting registration');
      authentication
        .register($scope.vm.credentials) //Jake note: added $scope here
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('profile');
        });
    };

  }

})();