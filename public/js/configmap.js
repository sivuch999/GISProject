console.log('mappppppppppppppp')
$.ajax
    ({
    url:"/layer",
    dataType: "json",
    success:function(data)
    {
      var strdata = JSON.stringify(data) // result to string
      var ledata = data.length
      
      var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope, $http) {
  vm = this;

  // Set the Map Options to be applied when the map is set.
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(18.8114649, 98.9545014)
    //mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  // Set a blank infoWindow to be used for each to state on click
  var infoWindow = new google.maps.InfoWindow({
    content: ""
  });

  // Set the map to the element ID and give it the map options to be applied
  vm.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var stateLayer1 = new google.maps.Data();
    var stateLayer2 = new google.maps.Data();
  // Create the state data layer and load the GeoJson Data
  
  //console.log(strdata)
  stateLayer1.loadGeoJson('/public/js/Bldg.geojson')
  stateLayer2.loadGeoJson('/public/js/JSON_JedLin.geojson')
  //console.log(ledata)
  /*var state2 = data
  console.log(state1)
  console.log(strdata)*/
  //console.log(stateLayer2.loadGeoJson('/public/js/JSON_JedLin.geoJson'))
  // Set and apply styling to the stateLayer
  stateLayer1.setStyle(function(feature) {
    //console.log(feature.getProperty('Area_type'))
    return {
      fillColor: getColors(feature.getProperty('FID')), // call function to get color for state based on the COLI (Cost of Living Index)
      fillOpacity: 0.8,
      strokeColor: '#b3b3b3',
      strokeWeight: 1,
      zIndex: 1
    };
  });



  // Adds an info window on click with in a state that includes the state name and COLI
  stateLayer1.addListener('click', function(e) {
    
    infoWindow.setContent(
      '<table border="0" width="200">' +
      '<tr>'+
        '<th width=80>'+' FID: '+'</th>'+
        '<th>'+e.feature.getProperty('FID')+'</th>'+
      '<tr>'+
        '<th width=80>'+' ID: '+'</th>'+
        '<th>'+e.feature.getProperty('ID')+'</th>'+
      '<tr>'+
        '<th width=80>'+' Area: '+'</th>'+
        '<th>'+e.feature.getProperty('Area')+'</th>'+
      '<tr>'+
        '<th width=80>'+' Area_id: '+'</th>'+
        '<th>'+e.feature.getProperty('Area_id')+'</th>'+
      '<tr>'+
        '<th width=80>'+' Area_type: '+'</th>'+
        '<th>'+e.feature.getProperty('Area_type')+'</th>'+
      '<tr>'+
        '<th width=80>'+' Descrip: ' +'</th>'+
        '<th>'+e.feature.getProperty('Descrip')+'</th>'+
      '<tr>'+
        '<th width=80>'+' Date: ' +'</th>'+
        '<th>'+e.feature.getProperty('Date')+'</th>'+
      '<tr>'+
        '<th width=80>'+' Area_NEW: '+'</th>'+ 
        '<th>'+e.feature.getProperty('Area_NEW')+'</th>'+
      '<tr>'+
        '<th width=80>'+' Student '+'</th>'+ 
        '<th>'+data[0].Descrip+'</th>'+
      '</table>');
  
    var anchor = new google.maps.MVCObject();
    anchor.set("position", e.latLng);
    infoWindow.open(vm.map, anchor);
  });


    stateLayer2.addListener('click', function(e) {
      infoWindow.setContent('<table border="0" width="200">' +
      '<tr>'+
        '<th width=80>'+' FID: '+'</th>'+
        '<th>'+e.feature.getProperty('FID')+'</th>'+
      '<tr>'+
        '<th width=80>'+' ID: '+'</th>'+
        '<th>'+e.feature.getProperty('ID')+'</th>'+
      '<tr>'+
        '<th width=80>'+' Area: '+'</th>'+
        '<th>'+e.feature.getProperty('Area')+'</th>'+
      '<tr>'+
        '<th width=80>'+' Area_id: '+'</th>'+
        '<th>'+e.feature.getProperty('Area_id')+'</th>'+
      '<tr>'+
        '<th width=80>'+' Area_type: '+'</th>'+
        '<th>'+e.feature.getProperty('Area_type')+'</th>'+
      '<tr>'+
        '<th width=80>'+' Descrip: ' +'</th>'+
        '<th>'+e.feature.getProperty('Descrip')+'</th>'+
      '<tr>'+
        '<th width=80>'+' Date: ' +'</th>'+
        '<th>'+e.feature.getProperty('Date')+'</th>'+
      '<tr>'+
        '<th width=80>'+' Area_NEW: '+'</th>'+ 
        '<th>'+e.feature.getProperty('Area_NEW')+'</th>'+
      '</table');

    var anchor = new google.maps.MVCObject();
    anchor.set("position", e.latLng);
    infoWindow.open(vm.map, anchor);
  });

  // Final step here sets the stateLayer GeoJSON data onto the map
  filter = function(index,state){
    let layer = [stateLayer1,stateLayer2]
    if(state===true){
      layer[index].setMap(vm.map);
    }else{
      layer[index].setMap(null);
    }
  }
  //stateLayer.setMap(vm.map);
  //stateLayer2.setMap(vm.map);

  // returns a color based on the value given when the function is called
  function getColors(FID) {
    //console.log(FID)
    var colors = [
      '#99FF33',
      '#FFFF00',
      '#FFCC00',
      '#FF0000',
      '#CC0066'
    ];
    if(FID >= 50) 
      return colors[4] 
    if(FID >= 40) 
      return colors[3] 
    if(FID >= 30) 
      return colors[2] 
    if(FID >= 20) 
      return colors[1] 
    if(FID >= 0) 
      return colors[0]
  }
});

    }
  });



