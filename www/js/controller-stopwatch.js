angular.module('app.controllers').controller('stopwatchCtrl', function($scope, $state, $interval, $localstorage, $rootScope, $stateParams ) {

        var tElapsed
        
        $scope.activity = {
          distance: '0',
          timer: '',
          calburn: '',
          avgpace: ''
        };

        $scope.activity.timer = 0;

        $scope.resetTimer = function() {
          $scope.activity.timer = 0;
        };

        $scope.stopTimer = function() {

        console.log("TIMER STOPPED: " + $scope.secs)
          $rootScope.elapsedtime = $scope.secs;

        console.log("Timer: " + $rootScope.elapsedtime)
          if (angular.isDefined(tElapsed)) {

            $interval.cancel(tElapsed);
            tElapsed = undefined;
          }

        $scope = [];
        $state.go('activityCompleted');
        };
        
        $scope.startTimer = function() {
          // Don't start a new timer if we are already counting

          if ( angular.isDefined(tElapsed) ) return;

          tElapsed = $interval(function() {
            if ($scope.activity.timer >= 0) {
              $scope.activity.timer = $scope.activity.timer + 100;

              $scope.secs = humanizeDuration($scope.activity.timer, {units: ['s']})
                if($scope.secs > 60){
                  $scope.secs = 0
                }else{
                  $scope.secs = $scope.secs;

                };

              $scope.mins = humanizeDuration($scope.activity.timer, {units: ['m'], round: true})
                if($scope.secs > 60){
                  $scope.secs = 0
                } else{
                  $scope.secs = $scope.secs;
                };
              $scope.hours = humanizeDuration($scope.activity.timer, {units: ['h'], round: true})
                if ($scope.hours > 60 ){
                  $scope.hours = 0
                }else{
                  $scope.hours = $scope.hours;
                };

            } else {
              $scope.stopTimer();
            }
          }, 100);
        };

}) // END STOPWATCHCONTROLLER 