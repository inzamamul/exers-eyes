// Settings Controller (contains the settings of the user details such as name height etc)   
angular.module('app.controllers').controller('settingsCtrl', function($scope, $rootScope, $localstorage, $ionicPopup) {

   $rootScope.masteruser= {};
  
   $scope.updateSettings = function(user){

      $rootScope.masteruser= angular.copy(user);
      
      var alertPopup = $ionicPopup.alert({
            title: 'Settings updated',
            template: "Your settings have been updated." 
            });      
   }
 

}) // End Settings Controller