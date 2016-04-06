(function() {

ngApp.service('testService', testService);

  testService.$inject = ['$http', 'authentication'];
  function testService ($http, authentication) {

    var testPost = function (post) {
      return $http({
	url: '/authAPI/finalPostings',
	method: 'POST', 
        headers: {'Authorization': 'Bearer '+ authentication.getToken()},
        data: post
      });
    };

    return {
      testPost : testPost
    };
  }

})();
