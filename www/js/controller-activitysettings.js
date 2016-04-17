// Activty Settings Controller (contains the settings used by the user when they inititate activity)      
angular.module('app.controllers').controller('activitySettingsCtrl', function($rootScope, $scope, routeservice) {

	// $scope.routeList = [
	// { 	name: "Mile End Park Loop",
	// 	startLoc: "51.543963, -0.032926", 
	// 	endLoc: "51.518631, -0.035189" , 
	// }, 

	// 	{ 	name: "Victoria Park Loop",
	// 	startLoc: "51.523412, -0.036398", 
	// 	endLoc: "51.533408, -0.041382" , 
	// }, 

	// 	{ 	name: "Hyde Park Loop",
	// 	startLoc: "51.511339, -0.171213" , 
	// 	endLoc: "51.505709, -0.152313" , 
	// }, 

	// 	{ 	name: "Regents Park Loop",
	// 	startLoc: "51.534865, -0.158828" , 
	// 	endLoc: "51.525436, -0.146639" , 
	// }, 

	// 	{ 	name: "Greenwich Park Loop",
	// 	startLoc: "51.479586, -0.006624" , 
	// 	endLoc: "51.473982, 0.004455" , 
	// }, 

	// 	{ 	name: "Battersea Park Loop",
	// 	startLoc: "51.478313, -0.149929" , 
	// 	endLoc: "51.481011, -0.158304" , 
	// }, 
	// ];

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