// Controller for Activity Completed (when the user has finished the activity)
angular.module('app.controllers').controller('activityCompletedCtrl', function($scope, $rootScope) {

			$scope.distance = $scope.routedistance
			
            console.log("elapsed rootscope time: " + $rootScope.elapsedtime)
            $scope.elapsedTime = 100
            //Calories Burned = [0.0215 x KPH3 - 0.1765 x KPH2 + 0.8710 x KPH + 1.4577] x WKG x T
            // arbitary calburn value below 
            $scope.cb = 100;

            console.log("act complete: time elapsed: " + $scope.elapsedTime); 
            console.log("act complete: cal burn" + $scope.cb); 


})
