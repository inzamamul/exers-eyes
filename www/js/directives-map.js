// Google Maps Directive for directions

angular.module('app.directives', []).directive('activityMap',function(){

////
  return {
    restrict: 'EA',
    require: '?ngModel',
    scope:{
    myModel: '=ngModel'
    },
    link: function(scope,element,attrs,ngModel){
        
      var mapOptions;
      var googleMap;
      var searchMarker;
      var searchLatLng;
      
      ngModel.$render = function(){


        searchLatLng = new google.maps.LatLng(scope.myModel.latitudeCtrl, scope.myModel.longitudeCtrl);

        mapOptions = {
            center: searchLatLng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            draggable: false
          };
            
        googleMap = new google.maps.Map(element[0],mapOptions);


  		directionsDisplay.setMap(googleMap);
  		directionsDisplay.setPanel(document.getElementById('directionsPanel'));

  	


        searchMarker = new google.maps.Marker({
          position: searchLatLng,
          map: googleMap,
          icon: 'http://i.stack.imgur.com/orZ4x.png',
          draggable: false
        });
        
        google.maps.event.addListener(searchMarker, 'dragend', function(){
          scope.$apply(function(){
            scope.myModel.latitudeCtrl = searchMarker.getPosition().lat();
            scope.myModel.longitudeCtrl = searchMarker.getPosition().lng();
          });
        }.bind(this));
        
      };
      
      scope.$watch('myModel', function(value){


        navigator.geolocation.getCurrentPosition(function(pos){

          scope.myModel.latitudeCtrl = pos.coords.latitude
          scope.myModel.longitudeCtrl = pos.coords.longitude
        })

        var myPosition = new google.maps.LatLng(scope.myModel.latitudeCtrl, scope.myModel.longitudeCtrl);
        searchMarker.setPosition(myPosition);
      }, true);

    var directionsDisplay = new google.maps.DirectionsRenderer;
  	var directionsService = new google.maps.DirectionsService;

     //calculate route
  	calculateRoute(directionsService, directionsDisplay);

  	function calculateRoute(directionsService, directionsDisplay){

  		var start = "51.543963, -0.032926"
  		var end = "51.536289, -0.034578"

  		directionsService.route({
  			origin: start, 
  			destination: end, 
  			travelMode: google.maps.TravelMode.WALKING
  		}, function(response, status) {
	  			if (status === google.maps.DirectionsStatus.OK) {
	  				directionsDisplay.setDirections(response);
	  			}else {
	  				console.log("directions service failed");
	  				// change this later to ionic popup window
	  			}
  			
  		});
  	} // end calculateRoute
    } // end link function      
  } // end return
})