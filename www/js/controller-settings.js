// Settings Controller (contains the settings of the user details such as name height etc)   
angular.module('app.controllers').controller('settingsCtrl', function($scope, $window, $location, $rootScope, $localstorage, $ionicPopup, $timeout) {

   		 	$rootScope.user = {

   		 		fname : '',
   		 		lname: '',
   		 		age: '',
   		 		weight: '',
   		 		height: ''
   		 	};

   		 	// console.log('line 83: ' + localStorage.getItem('lname'))

   		 	if (localStorage.getItem('fname')){

   		 		$rootScope.user = {

   		 		fname : localStorage.getItem('fname'),
   		 		lname : localStorage.getItem('lname'),
   		 		age : localStorage.getItem('age'),
   		 		weight : localStorage.getItem('weight'),
   		 		height : localStorage.getItem('height')
   		 		};

   		 	}else{
   		 		// eh?? 
   		 		$rootScope.user = {
   		 			fname : localStorage.getItem('fname'),
   		 			lname : localStorage.getItem('lname'),
   		 			age : localStorage.getItem('age'),
   		 			weight : localStorage.getItem('weight'),
   		 			height : localStorage.getItem('height')
   		 		}

   		 	}

 	$scope.saveUser = function() {

		$localstorage.set('fname', $scope.user.fname);
		$localstorage.set('lname', $scope.user.lname);
		$localstorage.set('age', $scope.user.age);
		$localstorage.set('weight', $scope.user.weight);
		$localstorage.set('height', $scope.user.height);

		$scope.showPopup($scope.user.fname);
		// console.log($localstorage.get('fname'));

 	};


  	// Triggered on a button click, or some other target
  $scope.showPopup = function() {
    	var alertPopup = $ionicPopup.alert({
    	title: 'Details saved',
      	template: '<p class="center">User details saved.</p>'
    	});
    	alertPopup.then(function(res) {
      	//console.log('cons log details saved');
    	});
  	};

}) // end Settings Controller