// controller: connects the view to the model. They should contain minimal logic (business logic), 
// and should just tie buttons from view to model, and pass variables to your model to your view. 
// this is the C in the MVC model

angular.module('app.controllers', [])

// Dashboard Controller (main "homepage")
.controller('dashboardCtrl', function($scope, $state, $rootScope, $localstorage, $cordovaVibration) {


	$scope.tester = function() { 
		console.log("button clicked.")
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
		        	console.log("sucess")
		        }, function (reason) {
		            alert(reason);
		        });
		}, false);		
	}	// End tester() 

	$scope.activityPrep = function() {

		$state.go('activitySettings')
	}
})


