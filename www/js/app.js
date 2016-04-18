// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

// this is the "constructor" of the angular app - load dependencies of the app here 
angular.module('app', ['ionic','ngCordova', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngStorage', 'lokijs', 'backand'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });


})

.config(function (BackandProvider) {
      BackandProvider.setAppName('exers-eyes');
      BackandProvider.setAnonymousToken('a27230ec-7a03-447e-82ae-fbced58799ab'); // token is for anonymous login.
      BackandProvider.setSignUpToken('169d4798-1982-4ea0-9b63-10e552fd3d4b');
  })


.run(function ($rootScope, $state, LoginService, Backand) {

    function unauthorized() {
        console.log("user is unauthorized, sending to login");
        $state.go('login');
    }
    function signout() {
        LoginService.signout();
    }
    $rootScope.$on('unauthorized', function () {
        unauthorized();
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        if (toState.name == 'login') {
            signout();
        }
        else if (toState.name != 'login' && Backand.getToken() === undefined) {
            unauthorized();
        }
    });
})

 




