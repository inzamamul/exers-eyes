// Settings Controller (contains the settings of the user details such as name height etc)   
angular.module('app.controllers').controller('settingsCtrl', function($scope, $rootScope, $localstorage, $ionicPopup) {

   $rootScope.masteruser= {};
  
   $scope.updateSettings = function(user){

      $rootScope.masteruser= angular.copy(user);
      
      document.addEventListener('deviceready', function () {
      
      navigator.vibrate(100);
	    
      var alertPopup = $ionicPopup.alert({
	    title: 'Settings updated',
	    template: "Your settings have been updated." 
	    });      
	       
      }, false);  

   }

}) // End Settings Controller