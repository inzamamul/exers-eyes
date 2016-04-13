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
              $scope.activity.timer = $scope.activity.timer + 1;

            } else {
              $scope.stopTimer();
            }
          }, 100);
        };

})