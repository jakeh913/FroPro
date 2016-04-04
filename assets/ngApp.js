var ngApp = angular.module('fp',  [
	'ui.bootstrap',
	'ngRoute',
	'ngAnimate',
	'ngTouch',
	'ui.tinymce',
	'ngSanitize'
]);
(function () {

ngApp.service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {

    var saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    register = function(user) {
      return $http.post('/api/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    logout = function() {
      $window.localStorage.removeItem('mean-token');
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
    };
  }


})();

(function() {

ngApp.service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {

    var getProfile = function () {
      return $http.get('/authAPI/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      getProfile : getProfile
    };
  }

})();

(function () {

ngApp.service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {

    var saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    register = function(user) {
      return $http.post('/authAPI/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    login = function(user) {
      return $http.post('/authAPI/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    logout = function() {
      $window.localStorage.removeItem('mean-token');
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
    };
  }


})();

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
(function () {

ngApp.controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','authentication'];
  function navigationCtrl($location, authentication) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

  }

})();
(function () {

ngApp.directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: '../template/nav.html',
	  controller: 'navigationCtrl as navvm'
    };
  }

})();
(function() {
  
ngApp.controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData', '$scope', 'postingService'];
  function profileCtrl($location, meanData, $scope, postingService) {
    $scope.vm = this;

    $scope.vm.user = {};

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
ngApp.controller('MainCtrl', ['$scope', '$window', '$location', 'postingService', 
        function MapCtrl($scope, $window, $location, postingService) {
            $scope.pageTitle = 'Forestry Jobs';
            var mapLayers = {
                mapboxTile: $window.L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
					attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery ? <a href="http://mapbox.com">Mapbox</a>',
					id: 'mapbox.streets',
					accessToken: 'pk.eyJ1IjoiamFrZWg5MTMiLCJhIjoiY2loOXNjbGttMHU3N3Ywa2ljYjg4MmJsNyJ9.5Bk40zHBuVB2g2Ojf4aIAA'
				})			
            };
            
			var map = $window.L.map('map').fitBounds([[35, -120],[55, -80]]);
		    
			$scope.MapModel = {
                map: map,
                mapLayers: mapLayers
            };

			$scope.MapModel.mapLayers.mapboxTile.addTo($scope.MapModel.map);

        
						
			
			$scope.MapModel.map.on("resize", function(){
					map.fitBounds([[35, -120],[55, -80]])
			});
			
			postingService.postingFetch()
			.then(function(response){
				return $scope.postings = response.data;
			})
			.then(function(data){
				var markers = L.markerClusterGroup();
				for (var i = 0; i < $scope.postings.length; i++) {
				var marker = new L.marker([$scope.postings[i].locationLat, $scope.postings[i].locationLng])
				.bindPopup($scope.postings[i].title)
				.addTo(markers);
				$scope.MapModel.map.addLayer(markers);
				}
			})

        }
    ])
;

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
		    testService.testPost(/* {
			title: $scope.adminPostingEditDetail.title,
			postingBody: $scope.adminPostingEditDetail.postingBody,
			loc: $scope.adminPostingEditDetail.loc,
			locationLat: response.data.results[0].geometry.location.lat,
			locationLng: response.data.results[0].geometry.location.lng,
			awaitingMod: 0,
			postStatus: postLive,
			userPosted: 'publicly hidden',
			userID: $scope.adminPostingEditDetail.userID,
			jobUniqueID: $scope.adminPostingEditDetail.jobUniqueID,
			version: $scope.adminPostingEditDetail.version
		    }*/)
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

  




ngApp.controller('editPostingCtrl', function editPostingCtrl($scope, $routeParams, postingService, $http) {
    postingService.fetchSinglePosting($routeParams.id)
    .success(function(response){
	return $scope.editPostingDetail = response
    })
    .error(function(e){
	console.log(e);
    });

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

ngApp.controller('NewPostingCtrl', function NewPostingCtrl($scope, $http) {
    $scope.data = {};
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

ngApp.controller('postingDetailCtrl', function($scope, postingService, $routeParams){
    postingService.fetchSinglePosting($routeParams.id)
    .success(function(response){
	return $scope.postingDetail = response
    })
    .error(function(e){
	console.log(e);
    });
});

ngApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

  //$scope.items = items;
  //$scope.selected = {
  //  item: $scope.items[0]
  //};

  $scope.ok = function () {
    $uibModalInstance.close(/*$scope.selected.item*/);
  };

  //$scope.cancel = function () {
  //  $uibModalInstance.dismiss('cancel');
  //};
});

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
			userPosted: r.email,
			userID: r._id,
			version: 0 
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
			userPosted: "Not authenticated",
			userID: "None",
			version: 0
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

ngApp.service('postingService', function ($http, authentication) {
    this.postingFetch = function () {
        return $http.get('/api/postings');
    };
    this.postingPost = function(post){
	return $http.post('/api/postings', post)
    }
    this.fetchSinglePosting = function(id){
	return $http.get('/api/postings/' + id) 
    }
    this.publicPostingPost = function(post){
	return $http.post('/authAPI/finalPostings', 
	    {
		headers: {
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9' 
        }

	    }
	)
    };

});

ngApp.controller('AccordionDemoCtrl', function ($scope) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
});
ngApp.service('reverseGeocodingService', function ($http) {
	this.revGeocode = function(addr){
		return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
			  params: {
				address: addr,
				sensor: false
			  }
		})
	}
	
});
(function () {

  angular.module('meanApp', ['ngRoute']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
		.when('/', { controller: 'MainCtrl', templateUrl: 'frontPage.html' })
		.when('/posting/:id', { controller: 'postingDetailCtrl', templateUrl: 'postingDetail.html' })
		.when('/posting', { controller: 'NewPostingCtrl', templateUrl: 'newPosting.html'} )
		.when('/register', { controller: 'registerCtrl', templateUrl: 'register.html'} )
		.when('/login', { controller: 'loginCtrl', templateUrl: 'login.html'} )
		.when('/editPosting/:id', { controller: 'editPostingCtrl', templateUrl: 'editPosting.html'} )
		.when('/adminEditPostingDetail/:id', { controller: 'adminEditPostingCtrl', templateUrl: 'adminPostingEdit.html'} )
		.when('/profile', { controller: 'profileCtrl', templateUrl: 'profile.html'} )
		.otherwise({redirectTo: '/'});

    // use the HTML5 History API
		//$locationProvider.html5Mode(true);
  }

  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
        $location.path('/');
      }
    });
  }
  
  angular
    .module('fp')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);

})();

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
