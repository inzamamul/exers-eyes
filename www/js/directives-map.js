// Google Maps Directive for directions
angular.module('app.directives', []).directive('activityMap',function(){

////
  return {
    restrict: 'EA',
    require: '?ngModel',
    scope:{
    myModel: '=ngModel',
    lat: '=', //twowaybinding
    chroute: '='
    },

    link: function( scope,element,attrs,ngModel){
      
      var mapOptions;
      var googleMap; 
      var searchMarker;
      var searchLatLng;

      console.log(scope);
      
      //a listener 
      scope.$watch('lat', function(lat){
        console.log("lat: " + lat);
        //add any function calls here
      })

      //a listener 
      scope.$watch('chroute', function(chroute){
        console.log("chroute: " + chroute);
        //add any function calls here
      })

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
  	calculateRoute(directionsService, directionsDisplay, scope, ngModel);

  	function calculateRoute(directionsService, directionsDisplay, scope, ngModel){
      var start = ""
      var end = ""
      
      if(scope.routestart!=null){
  		start = scope.routestart
      }else{
      console.log("scope routestart is null")
      start = "51.543963, -0.032926"
      }

  		if(scope.routeend!= null){
      end = scope.routeend
      }else{
      console.log("scope routeend is null")
      end = "51.518631, -0.035189"
      }

  		directionsService.route({
  			origin: start, 
  			destination: end,
  			travelMode: google.maps.TravelMode.WALKING
  		}, function(response, status) {
	  			if (status === google.maps.DirectionsStatus.OK) {
	  				directionsDisplay.setDirections(response);
	  				walkingSteps(response, scope, ngModel);
	  			}else {
	  				console.log("directions service failed");
	  				// change this later to ionic popup window
	  			}
  		});
  	} // end calculateRoute

	  	function walkingSteps(directionResult, scope, ngModel){

        var currentstep; 
	  		var route = directionResult.routes[0].legs[0];

// arbitary looking for a single step in route[] >> will need to change so it follows users geoLoc   		
	  		currentStep = route.steps[0].instructions;
        scope.currStep = currentStep
        console.log(currentStep)
     
      } // end walkingSteps 

      
    } // end link function

  } // end return of directive 
})

//for looking at proximity of the location
//LatLngBounds class

