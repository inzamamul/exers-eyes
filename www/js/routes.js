angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  

  $stateProvider

      .state('tabsController.dashboard', {
    url: '/dashboard',
    views: {
      'tab1': {
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl'
      }
    }
  })

  .state('tabsController.activityList', {
    url: '/activity-list',
    views: {
      'tab2': {
        templateUrl: 'templates/activityList.html',
        controller: 'activityListCtrl'
      }
    }
  })

  .state('tabsController.settings', {
    url: '/settings',
    views: {
      'tab3': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/dashboard',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('activitySettings', {
    url: '/activity-settings',
    templateUrl: 'templates/activitySettings.html',
    controller: 'activitySettingsCtrl'
  })

  .state('activityInProgress', {
    url: '/activity-in-progress',
    templateUrl: 'templates/activityInProgress.html',
    controller: 'MapController'
  })

  .state('tabsController.activity1Details', {
    url: '/activity1',
    views: {
      'tab2': {
        templateUrl: 'templates/activity1Details.html',
        controller: 'activity1DetailsCtrl'
      }
    }
  })

  .state('tabsController.activity2Details', {
    url: '/activity2',
    views: {
      'tab2': {
        templateUrl: 'templates/activity2Details.html',
        controller: 'activity2DetailsCtrl'
      }
    }
  })

  .state('tabsController.activity3Details', {
    url: '/activity-3',
    views: {
      'tab2': {
        templateUrl: 'templates/activity3Details.html',
        controller: 'activity3DetailsCtrl'
      }
    }
  })

  .state('activityCompleted', {
    url: '/activity-complete',
    templateUrl: 'templates/activityCompleted.html',
    controller: 'activityCompletedCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'verificationCtrl'
  //  controllerAs: 'login'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'verificationCtrl'
  })

$urlRouterProvider.otherwise('/login')


});