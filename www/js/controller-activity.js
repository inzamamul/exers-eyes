angular.module('app.controllers').controller('activityCtrl', function($rootScope, $localStorage, $scope){

	// activity object
	$scope.activity = {
	 	distance: '0',
    	timer: '',
    	calburn: '',
    	avgpace: ''
    };

    // Storing activity details
    $scope.storeActivity = function() {

    if($scope.activity.timer !== undefined){
  	    $scope.activity.avgpace = parseFloat( $scope.activity.distance / $scope.activity.timer).toFixed(2)
    }

    	if(typeof(Storage) != "undefined"){

    		$localStorage.activity = $scope.activity; 
    		console.log("activity stored in ngStorage");

    	}else{
    		console.log("activity not stored in ngStorage")
    	}
    }
    
    //Reading an activity
    $scope.getActivity = function() {
	    if($localStorage.activity.distance !== undefined)
	    {
	    	$scope.activity.distance = $localStorage.activity.distance;
	    
	    }else if($localStorage.activity.time !== undefined)
	    {
	    	$scope.activity.timer = $localStorage.activity.timer;

	    }else if($localStorage.activity.calburn !== undefined)
	    {
	    	$scope.activity.calburn = $localStorage.activity.calburn;

	    }else if($localStorage.activity.avgpace !== undefined)
	    {
	    	$scope.activity.avgpace = $localStorage.activity.avgpace;
   		}
   	}

    //Deleting an activity
    $scope.deleteActivity = function() {

    	if(typeof(Storage) != "undefined"){
    		$localStorage.activity = null
    		console.log("activity has been nullified")
    	}else{
    		console.log("no data found in activity")
    	}
    }

})
