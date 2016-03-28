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