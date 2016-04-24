// Controller for Activity Completed (when the user has finished the activity)
angular.module('app.controllers').controller('firebaseCtrl', function($scope, $state, $firebaseAuth, $firebaseObject, $ionicPopup) {

var fbase = new Firebase('https://exers-eyes.firebaseio.com/'); // Exers-Eyes firebase can be found here 

     $scope.login = function(login_username, login_password) {
        var fbaseAuth = $firebaseAuth(fbase);
        fbaseAuth.$authWithPassword({
            email: login_username,
            password: login_password
        }).then(function(authData) {
            $state.go('tabsController.dashboard')
            console.log("sucessfully logged in! ")
                      
        }).catch(function(error) {
            console.error("LOGIN ERROR: " + error);
            
            var alertPopup = $ionicPopup.alert({
                title: 'Login Error!!',
                template: error
            });             

        });
    };
 
    $scope.register = function(login_username, login_password) {
        var fbaseAuth = $firebaseAuth(fbase);
        fbaseAuth.$createUser({email: login_username, password: login_password}).then(function() {
            return fbaseAuth.$authWithPassword({
                email: login_username,
                password: login_password
            });
        }).then(function(authData) {
            $state.go("tabsController.settings");
        }).catch(function(error) {
            console.error("ERROR " + error);
        });
    };

    $scope.logout = function() {
    var fbaseAuth = $firebaseAuth(fbase);
        $scope.profile = []; 
        fbase.unauth();
        $state.go('login');
        console.log("successfully logged out. ")

    };

    $scope.profile = function() {
    var fbaseAuth = $firebaseAuth(fbase);
    fbaseAuth = fbase.getAuth(); 
        if(fbaseAuth){
            var syncObject = $firebaseObject(fbase.child("users/" + fbaseAuth.uid + "/profile/"));
            syncObject.$bindTo($scope, "profile");
        }

    };

    // $scope.userdetails = function() {

    // fbaseAuth = fbase.getAuth(); 
    //     if(fbaseAuth){
    //         var syncObject = $firebaseObject(fbase.child("users/" + fbaseAuth.uid + "/profile/"));
    //         syncObject.$bindTo($scope, "profile");
    //     }

    // }

    $scope.createActivity = function() { 

        if($scope.profile.hasOwnProperty("activities") !== true){
                $scope.profile.activities = [];
                addactivity();
                console.log("Activity saved to FBase database. ");
                
        }else if($scope.profile.hasOwnProperty("activities") == true) {
                addactivity();
                console.log("Activity saved to FBase database. ");
                
        }else{
            console.log("Activity not saved to FBase database. ");

        }
        
        function addactivity() {
            $scope.profile.activities.push({

                "date" : new Date().toDateString(),
                "distance" :  $scope.act_dist,
                "timetaken" : $scope.act_time, 
                "pace" : $scope.act_pace, 
                "calburn" : $scope.act_calburn

            }, function(error){
                if(error){
                    console.log("There was an error in setting user details ")
                } else {
                    console.log("User details updated successfully")
                }
            });
        }
      
    };

        function saveDetails(){

        if($scope.profile.hasOwnProperty("details") !== true){
            $scope.profile.details = [];
            setUserDetails();
            console.log("Details have been saved to FBase database. ");
            
        }else if($scope.profile.hasOwnProperty("details") == true) {
            setUserDetails();
            console.log("Details have been saved to FBase database. ");
            
        }else{
            console.log("Details not saved to FBase database. ");

        }
        
        function setUserDetails() {
        
  //      var settingdetails = $firebaseObject(fbase.child("users/" + fbaseAuth.uid + "/profile/details"));
        var settingdetails = $scope.profile.child("details");

            settingdetails.set({

                "fname" : $scope.user.fname,
                "lname" :  $scope.user.lname,
                "age" : $scope.user.age, 
                "weight" : $scope.user.weight, 
                "height" : $scope.user.height

            }, function(error){
                if(error){
                    console.log("There was an error in setting user details ")
                } else {
                    console.log("User details updated successfully")
                }
            });
        }
    };
	
});
