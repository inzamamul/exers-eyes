// Activty Settings Controller (contains the settings used by the user when they inititate activity)      
angular.module('app.controllers').controller('activitySettingsCtrl', function( $scope,$rootScope, $state, $ionicPopup, RouteFactory) {
		   
	$scope.routeList = [
	  { name: "Mile End Road Test",
	    startLoc: "51.523045, -0.039911", 
	    endLoc: "s" , 
	  }, 

	  { name: "Mile End Park Loop",
	    startLoc: "51.543963, -0.032926", 
	    endLoc: "51.518631, -0.035189" , 
	  }, 

	    {   name: "Victoria Park Loop",
	    startLoc: "51.523412, -0.036398", 
	    endLoc: "51.533408, -0.041382" , 
	  }, 

	    {   name: "Hyde Park Loop",
	    startLoc: "51.511339, -0.171213" , 
	    endLoc: "51.505709, -0.152313" , 
	  }, 

	    {   name: "Regents Park Loop",
	    startLoc: "51.534865, -0.158828" , 
	    endLoc: "51.525436, -0.146639" , 
	  }, 

	    {   name: "Greenwich Park Loop",
	    startLoc: "51.479586, -0.006624" , 
	    endLoc: "51.473982, 0.004455" , 
	  }, 

	    {   name: "Battersea Park Loop",
	    startLoc: "51.478313, -0.149929" , 
	    endLoc: "51.481011, -0.158304" , 
	  }, 
	  ];	

	  $scope.chosenroute = { choice: 'Select a route!' }

// Once the user clicks the button "Ready? Lets Go!"
	  $scope.beginActivity = function(){

	  	// assigning the route to be used 
		$rootScope.routeName = $scope.chosenroute.choice.name;
 		$rootScope.routestart = $scope.chosenroute.choice.startLoc;
 		$rootScope.routeend = $scope.chosenroute.choice.endLoc;
		console.log("name of route: " + $scope.chosenroute.choice.name + " start of route: " + $rootScope.routestart) 

		 	if($rootScope.routeName == undefined){
	 			$ionicPopup.alert({
	     			title: 'Pick a route!',
	    			template: 'Please select a route from the list.'
			   	});
			}else{
				//console.log("sucess")
				$state.go('activityInProgress')
			}
		};
})