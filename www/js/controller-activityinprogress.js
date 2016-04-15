// Activity in progress (contains the business logic for when the user is busy with activity)   
angular.module('app.controllers').controller('activityInProgressCtrl', function($rootScope, $scope) {


$scope.currStep = "something "

$scope.searchLocation = {
// Set search location as middle of London (Charing X)    
      latitudeCtrl: 51.508590, 
      longitudeCtrl:  -0.125434
    }
    
// navigator.geolocation.getCurrentPosition(function(pos){   
//     $scope.searchLocation = { 
//       latitudeCtrl: pos.coords.latitude,
//       longitudeCtrl:  pos.coords.longitude
//     }
// });


    //
    /* 

find coordinates and store in array
every t seconds render the coordinates in google maps

~~ 'live' tracking of location

    */

})