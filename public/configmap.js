var app = angular.module('plunker', []);
console.log("test");
app.controller('MainCtrl', function($scope, $http) {
	console.log("test");
  vm = this;
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(18.8114649, 98.9545014)
  }
  vm.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var stateLayer = new google.maps.Data();
  stateLayer.loadGeoJson('/public/js/JSON_JedLin.geojson');
//18.8114649,98.9545014
  stateLayer.setMap(vm.map);

});
