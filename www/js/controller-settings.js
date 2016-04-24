// Settings Controller (contains the settings of the user details such as name height etc)   
angular.module('app.controllers').controller('settingsCtrl', function($scope, $rootScope, $localstorage, $ionicPopup) {

   $rootScope.masteruser= {};
  
   $scope.updateSettings = function(user){

      $rootScope.masteruser= angular.copy(user);
      
      var alertPopup = $ionicPopup.alert({
            title: 'Settings updated',
            template: "Your settings have been updated." + $rootScope.masteruser.fname
            });      
   }
 
   		 	// $rootScope.user = {

   		 	// 	fname : '',
   		 	// 	lname: '',
   		 	// 	age: '',
   		 	// 	weight: '',
   		 	// 	height: ''
   		 	// };

   		 	// // console.log('line 83: ' + localStorage.getItem('lname'))

   		 	// if (localStorage.getItem('fname')){

   		 	// 	$rootScope.user = {

   		 	// 	fname : localStorage.getItem('fname'),
   		 	// 	lname : localStorage.getItem('lname'),
   		 	// 	age : localStorage.getItem('age'),
   		 	// 	weight : localStorage.getItem('weight'),
   		 	// 	height : localStorage.getItem('height')
   		 	// 	};

   		 	// }else{
   		 	// 	// eh?? 
   		 	// 	$rootScope.user = {
   		 	// 		fname : localStorage.getItem('fname'),
   		 	// 		lname : localStorage.getItem('lname'),
   		 	// 		age : localStorage.getItem('age'),
   		 	// 		weight : localStorage.getItem('weight'),
   		 	// 		height : localStorage.getItem('height')
   		 	// 	}

   		 	// }


}) // End Settings Controller