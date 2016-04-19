// Activity in progress (contains the business logic for when the user is busy with activity)   
angular.module('app.controllers').controller('activityInProgressCtrl', function($rootScope, $scope) {


/* 

Algorithm for letting the user know they are going off path:

if geolocation(user) is in routeboxer then ok
else user needs to go back to route (use ngcordova vibrate )

*/

$scope.routeList = [
  {   name: "Mile End Park Loop",
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

  $scope.routeChange = function(route, routeservice){   
    
    $scope.activity.chroute = route.name;
    console.log("passed: " + $scope.chroute);

    $scope.activity.routestart = route.startLoc;
    $scope.activity.routeend = route.endLoc;
  };





})