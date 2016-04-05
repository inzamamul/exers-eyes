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

.controller('mapCtrl', function($scope,  $cordovaGeolocation){

	 $ionicPlatform.ready(function() {    
 
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });
         
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };
 
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
             
            var myLatlng = new google.maps.LatLng(lat, long);
             
            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };          
             
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);          
             
            $scope.map = map;   
            $ionicLoading.hide();           
             
        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });
    })

})


.controller('activityCtrl', function($rootScope, $localStorage, $scope){

	// activity object
	$scope.activity = {
	 	distance: '0',
    	time: '',
    	calburn: '',
    	avgpace: ''
    };

    // Storing activity details
    $scope.storeActivity = function() {

    console.log("timer: " + $scope.timer)
    $scope.activity.time = $scope.timer; 
    if($scope.activity.time !== undefined){
  	    $scope.activity.avgpace = parseFloat( $scope.activity.distance / $scope.activity.time).toFixed(2)
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
	    	$scope.activity.time = $localStorage.activity.time;

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


// logic behind the user details 
.controller('userCtrl', function($scope, $localStorage, $ionicPopup){

	$scope.user = {

   		 		fname : '',
   		 		lname: '',
   		 		age: '',
   		 		weight: '',
   		 		height: ''
   		 	};

   	// Storing user details
    $scope.storeUser = function() {

    	if(typeof(Storage) != "undefined"){

    		// name >> Name 
    		$scope.user.fname = $scope.user.fname.charAt(0).toUpperCase() + $scope.user.fname.slice(1);
    		$scope.user.lname = $scope.user.lname.charAt(0).toUpperCase() + $scope.user.lname.slice(1);
    		$scope.user.age = parseInt($scope.user.age)

    		if($scope.user.age > 100){
			console.log("old man")
   				
   			var confirmPopup = $ionicPopup.confirm({
	     		title: 'Pensioner!',
	     		template: 'Thats awfully old! Are you sure you are {{$scope.user.age}}?'
	   			});

	   			confirmPopup.then(function(res) {
		     		if(res) {
		       
		       		$localStorage.user = $scope.user; 
		     		} else {
		       
		     		}
	   			});
 			
    		}

    		$localStorage.user = $scope.user; 
    		console.log("user updated in ngStorage");

    	}else{
    		console.log("activity not stored in ngStorage")
    	}
    }

    // Getting User details
    $scope.getUser = function() {
	    if($localStorage.user.fname !== undefined)
	    {
	    	$scope.user.fname = $localStorage.user.fname;
	    
	    }else if($localStorage.user.lname !== undefined)
	    {
	    	$scope.user.lname = $localStorage.user.lname;

	    }else if($localStorage.user.age !== undefined)
	    {
	    	$scope.user.age  = $localStorage.user.age ;

	    }else if($localStorage.user.weight  !== undefined)
	    {
	    	$scope.user.weight = $localStorage.user.weight;
   		}else if($localStorage.user.height  !== undefined)
	    {
	    	$scope.user.height = $localStorage.user.height;
   		}
   	}

   	// delete a users details from local storage
   	$scope.deteteUser = function() {

   		if(typeof(Storage) != "undefined"){

   			$localStorage.user = null;
   			console.log("user details have been nullified")
   		}else{
   			console.log("user details were empty already")
   		}
   	}

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
.controller('activitySettingsCtrl', function($rootScope, $scope) {


})

// Activity in progress (contains the business logic for when the user is busy with activity)   
.controller('activityInProgressCtrl', function($rootScope, $scope) {

 // $scope.searchLocation = navigator.geolocation.watchPosition(geolocationSuccess,
 //                                                  [geolocationError],
 //    
 //                                              [geolocationOptions]);
    $scope.searchLocation = {
      
      latitudeCtrl: 51.523274, 
      longitudeCtrl: -0.040426 
    }


    //
    /* 

find coordinates and store in array
every t seconds render the coordinates in google maps

~~ 'live' tracking of location

    */


})

// Controllers for the activities of individual pieces of historical activity (may be made redundnant)   
.controller('activity1DetailsCtrl', function($scope) {

})
   
.controller('activity2DetailsCtrl', function($scope) {

})
   
.controller('activity3DetailsCtrl', function($scope) {

})
   
// Controller for Activity Completed (when the user has finished the activity)
.controller('activityCompletedCtrl', function($rootScope, $scope) {

	
})

.controller('storeDetails', function($scope, $localstorage) {


})

.controller('stopwatchCtrl', function($scope, $interval, $localstorage) {

          var tElapsed;
        $scope.timer = 0;

        $scope.resetTimer = function() {
          $scope.timer = 0;
        };

        $scope.stopTimer = function() {
          if (angular.isDefined(tElapsed)) {
            $interval.cancel(tElapsed);
            tElapsed = undefined;
          }
        };
        
        $scope.startTimer = function() {
          // Don't start a new timer if we are already counting
          if ( angular.isDefined(tElapsed) ) return;

          tElapsed = $interval(function() {
            if ($scope.timer >= 0) {
              $scope.timer = $scope.timer + 1;

            } else {
              $scope.stopTimer();
            }
          }, 100);
        };


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


