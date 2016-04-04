(function() {

ngApp.service('testService', testService);

  testService.$inject = ['$http', 'authentication'];
  function testService ($http, authentication) {

    var testPost = function () {
      return $http({
	url: '/authAPI/finalPostings',
	method: 'POST', 
        headers: {'Authorization': 'Bearer '+ authentication.getToken()},
        data: {/*insert data here*/}
      });
    };

    return {
      testPost : testPost
    };
  }

})();
