// Settings Controller (contains the settings of the user details such as name height etc)   
angular.module('app.controllers').controller('settingsCtrl', function($scope, $rootScope, $localstorage, $ionicPopup) {

   $rootScope.masteruser= {};
  
   $scope.updateSettings = function(user){


      if(user.age > 99 || user.age < 2){
         var alertPopup = $ionicPopup.alert({
         title: 'Are you really that age?!',
         template: "Your age doesn't look right." 
       });      
      return;
      }

      if(user.weight > 200 || user.weight < 10){
         var alertPopup = $ionicPopup.alert({
         title: 'Do you really weigh that much?!',
         template: "Your weight doesn't look right." 
       });   
       return;   
      }

      if(user.height > 250 || user.height < 50){
         var alertPopup = $ionicPopup.alert({
         title: 'Are you really that height?!',
         template: "Your height doesn't look right." 
       }); 
       return;     
      }

      $rootScope.masteruser= angular.copy(user);
      
      console.log("settings updated.")
      
      // vibration feedback
      navigator.vibrate(100);

      var alertPopup = $ionicPopup.alert({
       title: 'Settings updated',
       template: "Your settings have been updated." 
       });      
	   
      // Audio feedback
      TTS
           .speak({
               text: 'Settings saved',
               locale: 'en-GB',
               rate: 1.5
           }, function () {
            console.log("sucess")
           }, function (reason) {
               alert(reason);
      });    

	       
   }

}) // End Settings Controller