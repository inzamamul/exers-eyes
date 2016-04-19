// controller: connects the view to the model. They should contain minimal logic (business logic), 
// and should just tie buttons from view to model, and pass variables to your model to your view. 
// this is the C in the MVC model

angular.module('app.controllers', [])

// Dashboard Controller (main "homepage")
.controller('dashboardCtrl', function($scope,  $rootScope, $localstorage, $cordovaVibration) {

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

// Controllers for the activities of individual pieces of historical activity (may be made redundnant)   
.controller('activity1DetailsCtrl', function($scope) {

})
   
.controller('activity2DetailsCtrl', function($scope) {

})
   

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


