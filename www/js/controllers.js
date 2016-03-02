// controller: connects the view to the model. They should contain minimal logic (business logic), 
// and should just tie buttons from view to model, and pass variables to your model to your view. 
// this is the C in the MVC model

angular.module('app.controllers', [])
 
// Dashboard Controller (main "homepage")
.controller('dashboardCtrl', function($scope, $timeout, $rootScope, $localstorage) {

	$scope.getUser = function() {

		if($rootScope.fname == $localstorage.get('fname')){
		$rootScope.fname = $localstorage.get('fname');

		}else{

		$rootScope.fname = $localstorage.get('fname');
		}
		// console.log("dash: " + $rootScope.fname)
	}

	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams, options){ 
		if(toState.name =='tabsController.dashboard')
			$scope.getUser()
	})
	$scope.getUser()
	
})

  
// ActivityList Controller (history of the past activities in user history)
.controller('activityListCtrl', function($scope) {

	$scope.activities = [
	{
		'date': '16/02/2016',
		'distance': '22',
		'time' : '15',
		'calories' : '200',
	},
	{
		'date': '15/02/2016',
		'distance': '4',
		'time' : '12',
		'calories' : '190',
	},
	{
		'date': '13/02/2016',
		'distance': '3',
		'time' : '10',
		'calories' : '232',
	},
	{
		'date': '15/02/2016',
		'distance': '4',
		'time' : '12',
		'calories' : '190',
	},
		{
		'date': '15/02/2016',
		'distance': '4',
		'time' : '12',
		'calories' : '190',
	}
	];

})

// Settings Controller (contains the settings of the user details such as name height etc)   
.controller('settingsCtrl', function($scope, $window, $location, $rootScope, $localstorage, $ionicPopup, $timeout) {

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

 	$scope.imperialMetricChange = function() {
    	$scope.imperialMetric = { checked: true };
    	// console.log('ImperialMetric Change', $scope.imperialMetric.checked);
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

// Activty Settings Controller (contains the settings used by the user when they inititate activity)      
.controller('activitySettingsCtrl', function($scope) {

})

// Activity in progress (contains the business logic for when the user is busy with activity)   
.controller('activityInProgressCtrl', function($scope) {

 // $scope.searchLocation = navigator.geolocation.watchPosition(geolocationSuccess,
 //                                                  [geolocationError],
 //                                                  [geolocationOptions]);
    $scope.searchLocation = {
      
      latitudeCtrl: 51.523274, 
      longitudeCtrl: -0.040426 
    }



})

// Controllers for the activities of individual pieces of historical activity (may be made redundnant)   
.controller('activity1DetailsCtrl', function($scope) {

})
   
.controller('activity2DetailsCtrl', function($scope) {

})
   
.controller('activity3DetailsCtrl', function($scope) {

})
   
// Controller for Activity Completed (when the user has finished the activity)
.controller('activityCompletedCtrl', function($scope) {

})

.controller('storeDetails', function($scope, $localstorage) {


});


////////////////////////////////////////////////////////////////////////////////////////////////
// controller for DB access -- /// will be used later ?????

// Controller for DB access -- using LokiJS for the local storage DB
// .controller('OverviewCtrl', ['$scope', '$ionicPlatform', 'UserService', OverviewCtrl]);
// function OverviewCtrl($scope, $ionicPlatform, UserService) {  
//     var vm = this;

//     $ionicPlatform.ready(function() {

//         // Initialize the database.
//         UserService.initDB();

//         // Get all birthday records from the database.
//         UserService.getAllUsers()
//                         .then(function (Users) {
//                             vm.Users = Users;
//                         });
//     });

//     $scope.saveUser = function() {
//         if ($scope.isAdd) {
//             UserService.addUser($scope.user);              
//         } else {
//             UserService.updateUser($scope.user);               
//         }                       
//         $scope.modal.hide();
//     };

//     return vm;
// }


