// controller: connects the view to the model. They should contain minimal logic (business logic), 
// and should just tie buttons from view to model, and pass variables to your model to your view. 
// this is the C in the MVC model

angular.module('app.controllers', [])

// Dashboard Controller (main "homepage")
.controller('dashboardCtrl', function($scope,  $rootScope, $localstorage, $cordovaVibration) {

	// $scope.getUser = function() {

	// 	if($rootScope.fname == $localstorage.get('fname')){
	// 	$rootScope.fname = $localstorage.get('fname');

	// 	}else{

	// 	$rootScope.fname = $localstorage.get('fname');
	// 	}
	// 	// console.log("dash: " + $rootScope.fname)
	// }

	// $rootScope.$on('$stateChangeStart', 
	// function(event, toState, toParams, fromState, fromParams, options){ 
	// 	if(toState.name =='tabsController.dashboard')
	// 		$scope.getUser()
	// })
	// $scope.getUser()

	$scope.tester = function() { 
		console.log("button clicked :)")
		// make sure your the code gets executed only after `deviceready`.
		document.addEventListener('deviceready', function () {
		   
		    // Vibrate test
		    navigator.vibrate(500);

		    // or with more options
		    TTS
		        .speak({
		            text: 'Audio Test',
		            locale: 'en-GB',
		            rate: 1.5
		        }, function () {
		            alert('success');
		        }, function (reason) {
		            alert(reason);
		        });
		}, false);		
	}	// End tester() 

	$scope.activityPrep = function() {

		$state.go('activitySettings')
	}
})

// Controllers for the activities of individual pieces of historical activity (may be made redundnant)   
.controller('activity1DetailsCtrl', function($scope) {

})
   
.controller('activity2DetailsCtrl', function($scope) {

})
  

