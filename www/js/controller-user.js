// logic behind the user details 
angular.module('app.controllers').controller('userCtrl', function($scope, $localStorage, $ionicPopup){

	// $scope.user = {

 //   		 		fname : '',
 //   		 		lname: '',
 //   		 		age: '',
 //   		 		weight: '',
 //   		 		height: ''
 //   		 	};

 //   	// Storing user details
 //    $scope.saveUser = function() {

 //      console.log($scope.user.fname)

      
 //    	if(typeof(Storage) != "undefined"){

 //    		// name >> Name 
 //    		$scope.user.fname = $scope.user.fname.charAt(0).toUpperCase() + $scope.user.fname.slice(1);
 //    		$scope.user.lname = $scope.user.lname.charAt(0).toUpperCase() + $scope.user.lname.slice(1);
 //    		$scope.user.age = parseInt($scope.user.age)

 //    		if($scope.user.age > 100){
	// 		console.log("old man")
   				
 //   			var confirmPopup = $ionicPopup.confirm({
	//      		title: 'Pensioner!',
	//      		template: 'Thats awfully old! Are you sure you are {{$scope.user.age}}?'
	//    			});

	//    			confirmPopup.then(function(res) {
	// 	     		if(res) {
		       
	// 	       		$localStorage.user = $scope.user; 
	// 	     		} else {
		       
	// 	     		}
	//    			});
 			
 //    		}

 //    		$localStorage.user = $scope.user; 
 //    		console.log("user updated in ngStorage");

 //    	}else{
 //    		console.log("activity not stored in ngStorage")
 //    	}
 //    }

 //    // Getting User details
 //    $scope.getUser = function() {
	//     if($localStorage.user.fname !== undefined)
	//     {
	//     	$scope.user.fname = $localStorage.user.fname;
	    
	//     }else if($localStorage.user.lname !== undefined)
	//     {
	//     	$scope.user.lname = $localStorage.user.lname;

	//     }else if($localStorage.user.age !== undefined)
	//     {
	//     	$scope.user.age  = $localStorage.user.age ;

	//     }else if($localStorage.user.weight  !== undefined)
	//     {
	//     	$scope.user.weight = $localStorage.user.weight;
 //   		}else if($localStorage.user.height  !== undefined)
	//     {
	//     	$scope.user.height = $localStorage.user.height;
 //   		}
 //   	}

 //   	// delete a users details from local storage
 //   	$scope.deteteUser = function() {

 //   		if(typeof(Storage) != "undefined"){

 //   			$localStorage.user = null;
 //   			console.log("user details have been nullified")
 //   		}else{
 //   			console.log("user details were empty already")
 //   		}
 //   	}

})