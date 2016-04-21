// Controller for Activity Completed (when the user has finished the activity)
angular.module('app.controllers').controller('verificationCtrl', function($scope, $state, $firebaseAuth, $firebaseObject, $ionicPopup) {

var fbase = new Firebase('https://exers-eyes.firebaseio.com/');

 $scope.login = function(login_username, login_password) {
        var fbaseAuth = $firebaseAuth(fbase);
        fbaseAuth.$authWithPassword({
            email: login_username,
            password: login_password
        }).then(function(authData) {
            $state.go('tabsController.dashboard')
            console.log("sucess! ")
        }).catch(function(error) {
            console.error("LOGIN ERROR: " + error);
        });
    }
 
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
    }

    $scope.logout = function() {

        fbase.unauth();
        $state.go('login');

    }


    $scope.profile = function() {

    fbaseAuth = fbase.getAuth(); 
        if(fbaseAuth){
            var syncObject = $firebaseObject(fbase.child("users/" + fbaseAuth.uid + "/profile/"));
            syncObject.$bindTo($scope, "profile");
        }

    }



    // $scope.userdetails = function() {

    // fbaseAuth = fbase.getAuth(); 
    //     if(fbaseAuth){
    //         var syncObject = $firebaseObject(fbase.child("users/" + fbaseAuth.uid + "/profile/"));
    //         syncObject.$bindTo($scope, "profile");
    //     }

    // }

    $scope.create = function() { 

        $ionicPopup.prompt({
                title: 'Enter a new activity item',
                inputType: 'text'
            })
            .then(function(result) {
                if(result !== "") {
                    if($scope.profile.hasOwnProperty("activities") !== true) {
                        $scope.profile.activities = [];
                    }
                    $scope.profile.activities.push({distance: result});
                } else {
                    console.log("Activity not saved to FBase database. ");
                }
            });

    };

    $scope.saveDetails = function(){

       $ionicPopup.prompt({
                title: 'Enter your name',
                inputType: 'text'
            })
            .then(function(result) {
                if(result !== "") {
                    if($scope.profile.hasOwnProperty("details") !== true) {
                        $scope.profile.details = [];
                        console.log("ya goofed son")
                    }
                    $scope.profile.details.push({name: result, age: 20, height: 165, weight: 70});
                } else {
                    console.log("Details not saved to FBase database. ");
                }
            });

    };
	
});
