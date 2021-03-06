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
