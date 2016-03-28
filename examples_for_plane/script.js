angular.module('mapapp', [])
    .factory('RecordService', ['$http', '$q', '$cacheFactory',
        function RecordService($http, $q, $cacheFactory) {
            var partials = null;
            var $httpDefaultCache = $cacheFactory.get('$http');
            var getPartials = function (force) {
                if (force) {
                    $httpDefaultCache.removeAll();
                }
                return $http.get('partials.json', {cache: true}).then(function (value) {
                    partials = value.data.records;
                });
            };
            return {
                getPartials: getPartials,
                partials: function () {
                    return partials;
                }
            };
        }
    ])
    .factory('MapService', ['$window',
        function ($window) {
            var localStorage = $window.localStorage || {};
            return {
                getView: function () {
                    var view = localStorage['mapView'];
                    if (typeof view != 'undefined') {
                        view = $window.JSON.parse(view || '');
                        return view;
                    } else {
                        return {
                            lat: 39.73,
                            lng: -104.99,
                            zoom: 10
                        };
                    }
                },
                setView: function (view) {
                    localStorage['mapView'] = $window.JSON.stringify(view);
                }
            };
        }
    ])
    .controller('MapCtrl', ['$scope', '$window', '$location', 'RecordService', 'MapService',
        function MapCtrl($scope, $window, $location, RecordService, MapService) {
            $scope.pageTitle = 'Angular Map';
            $scope.RecordModel = {
                partials: [],
                markers: []
            };
            $scope.$watch(RecordService.partials, function (newValue, oldValue) {
                $scope.RecordModel.partials = newValue;
                $scope.refreshMap();
            });
            //Is this bad manners to use leaflet's cloudmade API key for demo???
            var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/d4fc77ea4a63471cab2423e66626cbb6/{styleId}/256/{z}/{x}/{y}.png';
            var cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade';
            var basemaps = {
                minimal: $window.L.tileLayer(cloudmadeUrl, {styleId: 22677, attribution: cloudmadeAttribution}),
                midnight: $window.L.tileLayer(cloudmadeUrl, {styleId: 999,   attribution: cloudmadeAttribution})
            };
            var layers = {
            //    motorways: $window.L.tileLayer(cloudmadeUrl, {styleId: 46561, attribution: cloudmadeAttribution})
            };
            var map = $window.L.map('map');
            $scope.MapModel = {
                map: map,
                basemaps: basemaps,
                layers: layers,
                zoom: 13
            };
            $scope.drawRecordMarkers = function () {
                if ($scope.MapModel.map) {
                    angular.forEach($scope.RecordModel.markers, function (v, k) {
                        v.addTo($scope.MapModel.map);
                    });
                }
            };
            $scope.refreshMap = function () {
                if ($scope.RecordModel.markers) {
                    angular.forEach($scope.RecordModel.markers, function (v, k) { $scope.MapModel.map.removeLayer(v); });
                    $scope.RecordModel.markers = angular.copy([]);
                }
                if ($scope.RecordModel.partials) {
                    angular.forEach($scope.RecordModel.partials, function (v, k) {
                        var m = $window.L.marker(v.geometry.coordinates, {title: v.id, riseOnHover: true, showOnMouseOver: true});
                        m.bindPopup('<div>' + v.name + '<div>');
                        $scope.RecordModel.markers.push(m);
                    });
                    $scope.drawRecordMarkers();
                }
            };
            $scope.MapModel.map.on("load", function (evt) {
                $scope.MapModel.basemaps.minimal.addTo(map);
                $window.L.control.layers($scope.MapModel.basemaps, $scope.MapModel.layers).addTo($scope.MapModel.map);
                $window.L.control.scale().addTo($scope.MapModel.map);
                $scope.drawRecordMarkers();
            });
            $scope.MapModel.map.on("moveend", function (evt) {
                if (!this._loaded) {
                    return;
                }
                var view = {
                    lat: this.getCenter().lat,
                    lng: this.getCenter().lng,
                    zoom: this.getZoom()
                };
                MapService.setView(view);
            });
            $scope.init = function () {
                var view = MapService.getView();
                $scope.MapModel.map.setView(L.latLng(view.lat, view.lng), view.zoom, true);
                $scope.MapModel.map.addLayer($scope.MapModel.layers.motorways);
                RecordService.getPartials();
                $scope.refreshMap();
            };
            $scope.init();
        }
    ])
;