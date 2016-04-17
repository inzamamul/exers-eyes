// Activity in progress (contains the business logic for when the user is busy with activity)   
angular.module('app.controllers').controller('activityInProgressCtrl', function($rootScope, $scope, GeoLocService, routeservice) {


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
    
    $scope.chroute = route.name;
    console.log("passed: " + $scope.chroute);

    $scope.chroutestart = route.startLoc;
    $scope.chrouteend = route.endLoc;
  };


// Above taken from controller-activity settings 

$scope.currStep = "step placeholder"

$scope.searchLocation = {
// Set search location as middle of London (Charing X)    
    latitudeCtrl: 51.508590, 
    longitudeCtrl:  -0.125434,

  }
    
  navigator.geolocation.getCurrentPosition(function(pos){   
      $scope.searchLocation = { 
        latitudeCtrl: pos.coords.latitude,
        longitudeCtrl:  pos.coords.longitude,
     
      }
    console.log("successfully geolocated myself @" + $scope.searchLocation.latitudeCtrl)    

  })

  function printChroute(){

  console.log(chroute)
  }

    //
    /* 

find coordinates and store in array
every t seconds render the coordinates in google maps

~~ 'live' tracking of location

    */

})