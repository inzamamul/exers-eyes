angular.module('app.controllers').controller('stopwatchCtrl', function($scope, $interval, $cordovaVibration, $localstorage) {

 // Vibrate 10ms (won't work if using on desktop as desktop can't vibrate (obviously))
   //      $cordovaVibration.vibrate(10);

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
          $scope.elapsedtime = $scope.activity.timer
          if (angular.isDefined(tElapsed)) {

            $interval.cancel(tElapsed);
            tElapsed = undefined;
          }
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

})