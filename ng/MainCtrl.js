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