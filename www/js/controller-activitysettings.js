// Activty Settings Controller (contains the settings used by the user when they inititate activity)      
angular.module('app.controllers').controller('activitySettingsCtrl', function($rootScope, $scope, routeservice) {
  
   $scope.routeChange = function(route, routeservice){   
    
    $scope.chroute = route.name;
    console.log("passed: " + $scope.chroute);

    $scope.chroutestart = route.startLoc;
    $scope.chrouteend = route.endLoc;
  };


	// $scope.routeChange = function(route, routeservice){		
	 	
	//  	$scope.chroute = routeservice.router;
	//  	//$scope.chroute = route.name;
	//  			console.log("passed: " + $scope.chroute);

	// 	$scope.chroutestart = route.startLoc;
	// 	$scope.chrouteend = route.endLoc;
	// };

	// $scope.passRoute = function(route){
	// 	$scope.routeservice = route.name;

	// 	$scope.chroutestart = route.startLoc;
	// 	$scope.chrouteend = route.endLoc;

	// 	console.log("passed" + $scope.chroute);
	// 	console.log("passed" + $scope.chroutestart);
	// 	console.log("passed" + $scope.chrouteend);

	// }

})