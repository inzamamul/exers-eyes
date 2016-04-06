// Activity in progress (contains the business logic for when the user is busy with activity)   
angular.module('app.controllers').controller('activityInProgressCtrl', function($rootScope, $scope) {

 // $scope.searchLocation = navigator.geolocation.watchPosition(geolocationSuccess,
 //                                                  [geolocationError],
 //    
 //                                              [geolocationOptions]);
    $scope.searchLocation = {
      
      latitudeCtrl: 51.523274, 
      longitudeCtrl: -0.040426 
    }


    //
    /* 

find coordinates and store in array
every t seconds render the coordinates in google maps

~~ 'live' tracking of location

    */


})