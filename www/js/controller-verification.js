// Controller for Activity Completed (when the user has finished the activity)
angular.module('app.controllers').controller('verificationCtrl', function($scope,  $state, $rootScope, Backand, LoginService) {

var temp_login = "meg@meg.com" 
var temp_pass = "megmeg"

        $scope.signin = function() {

        	console.log("attempt to login" + temp_login + " " + temp_pass + " " + $scope.login_email)
            LoginService.signin("meg@meg.com" , "megmeg" )
                .then(function () {
                    $scope.onLogin();

                    $state.go('tabsController.dashboard');

                }, function (error) {
                    console.log(error)
                })
        }

        $scope.onLogin = function() {
            $rootScope.$broadcast('authorized');
            $state.go('tabsController.dashboard');
            console.log("logged in successfully")
        }

        $scope.signout = function() {
            LoginService.signout()
                .then(function () {
                    //$state.go('tab.login');
                    $rootScope.$broadcast('logout');
                    $state.go('login', {}, {reload: true});
                })

        }

})
	

