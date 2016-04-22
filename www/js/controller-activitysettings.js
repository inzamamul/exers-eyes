// Activty Settings Controller (contains the settings used by the user when they inititate activity)      
angular.module('app.controllers').controller('activitySettingsCtrl', function($rootScope, $scope, $state, $ionicPopup, RouteFactory) {
	   
		$scope.routeList = [
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

		  $scope.chosenRoute = { name: 'Choose a route!', startLoc: '0', endLoc: '0' }; 

		  $scope.$watch('chosenRoute.name', function (newRoute, oldRoute) {
		  	if (newRoute != oldRoute )
		  		RouteFactory.setRouteName(newRoute);
		  		console.log("acitivity settings routename " + newRoute);

console.log("scope route is: " + $scope.chosenRoute.startLoc)
		  })

		  $scope.$watch('chosenRoute.startLoc', function (newStart, oldStart) {
		  	if (newStart != oldStart )
		  		RouteFactory.setRouteStart(newStart);
		  		console.log("acitivity settings routestart" + newStart);

		  })		  

		  $scope.$watch('chosenRoute.endLoc', function (newEnd, oldEnd) {
		  	if (newEnd != oldEnd )
		  		RouteFactory.setRouteEnd(newEnd);
		  		console.log("acitivity settings routeend" + newEnd);

		  })


// Once the user clicks the button "Ready? Lets Go!"
		  $scope.beginActivity = function(){
			  if($scope.chosenRoute.name != 'Choose a route!'){
			  		$state.go('activityInProgress')
			  }else{
			  	$state.go('activityInProgress')
					$ionicPopup.alert({
			     			title: 'Pick a route!',
			    			template: 'Please select a route from the list.'
			   	});
				}
			};
})