// controller: connects the view to the model. They should contain minimal logic (business logic), 
// and should just tie buttons from view to model, and pass variables to your model to your view. 
// this is the C in the MVC model


angular.module('app.controllers', [])
  
.controller('dashboardCtrl', function($scope) {

})
   
.controller('activityListCtrl', function($scope) {

})
   
.controller('settingsCtrl', function($scope) {

})
      
.controller('activitySettingsCtrl', function($scope) {

})
   
.controller('activityInProgressCtrl', function($scope) {

 // $scope.searchLocation = navigator.geolocation.watchPosition(geolocationSuccess,
 //                                                  [geolocationError],
 //                                                  [geolocationOptions]);
    $scope.searchLocation = {
      
      latitudeCtrl: 51.523274, 
      longitudeCtrl: -0.040426 
    }


})
   
.controller('activity1DetailsCtrl', function($scope) {

})
   
.controller('activity2DetailsCtrl', function($scope) {

})
   
.controller('activity3DetailsCtrl', function($scope) {

})
   
.controller('activityCompletedCtrl', function($scope) {

})

