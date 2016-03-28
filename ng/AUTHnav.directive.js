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