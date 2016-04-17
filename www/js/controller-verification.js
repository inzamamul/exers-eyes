// Controller for Activity Completed (when the user has finished the activity)
angular.module('app.controllers').controller('verificationCtrl', function(Backand, LoginService, $rootScope, $scope) {
 
 var login = this;

        function signin() {
        	console.log("attempt to login")
            LoginService.signin(login.email, login.password)
                .then(function () {
                    onLogin();

                }, function (error) {
                    console.log(error)
                })
        }

        function onLogin(){
            $rootScope.$broadcast('authorized');
            $state.go('tab.dashboard');
            console.log("logged in successfully")
        }

        function signout() {
            LoginService.signout()
                .then(function () {
                    //$state.go('tab.login');
                    $rootScope.$broadcast('logout');
                    $state.go($state.current, {}, {reload: true});
                })

        }

    login.signin = signin;
    login.signout = signout;
    
})
	

