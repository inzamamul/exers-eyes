// Google Maps Directive for directions
// adapted from demo available via http://jsfiddle.net/tgassmann/A5WLb/

angular.module('app.directives', []).directive('activityMap',function(){

////
  return {
    restrict: 'EA',
    require: '?ngModel',
    scope:{
    myModel: '=ngModel',
    lat: '=', //twowaybinding
    chroute: '=',
    rootLat: '='
    },

    link: function( scope,element,attrs,ngModel, rootScope){
      
      var mapOptions;
      var googleMap; 
      var searchMarker;
      var searchLatLng;
      var lat1;

      console.log(scope);
      
      //a listener 
      scope.$watch('lat', function(lat){
      console.log("lat in listener: " + lat);
      
      scope.myModel.latitudeCtrl = lat
        //add any function calls here
      }) // end watch

      ngModel.$render = function(){

        console.log("test log" + scope.myModel.latitudeCtrl)
       // console.log("rootScopeLat: " + rootScope.rootLat)
        searchLatLng = new google.maps.LatLng(scope.myModel.latitudeCtrl, scope.myModel.longitudeCtrl);
        
        mapOptions = {
            center: searchLatLng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            draggable: false
          };
            
      googleMap = new google.maps.Map(element[0],mapOptions);

  		directionsDisplay.setMap(googleMap);
  		directionsDisplay.setPanel(document.getElementById('directionsPanel'));

        searchMarker = new google.maps.Marker({
          position: searchLatLng,
          map: googleMap,
          // icon: '/img/marker.png',
          draggable: false
        });
        
        
      }; // end of render
//      
//      // scope.$watch('myModel', function(value){

      //   navigator.geolocation.getCurrentPosition(function(pos){

      //     scope.myModel.latitudeCtrl = pos.coords.latitude
      //     scope.myModel.longitudeCtrl = pos.coords.longitude
      //   })

      //   // still in the watch
      //   console.log("mylat has changed! " + scope.myModel.latitudeCtrl + scope.myModel.longitudeCtrl  )
      //   var myPosition = new google.maps.LatLng(scope.myModel.latitudeCtrl, scope.myModel.longitudeCtrl);
      //   searchMarker.setPosition(myPosition);
      // }, true);

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
      start = "51.524076, -0.037211"
      }

  		if(scope.routeend!= null){
      end = scope.routeend
      }else{
      console.log("scope routeend is null")
      end = "51.522921, -0.036149"
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
	  		currentStep = route.steps[1].instructions;
        scope.currStep = currentStep
        console.log(currentStep)
     
      } // end walkingSteps 

      
    } // end link function

  } // end return of directive 
})

//for looking at proximity of the location
//LatLngBounds class

