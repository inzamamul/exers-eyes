// Controller for sharing via social channels 
//https://www.thepolyglotdeveloper.com/2014/10/implement-social-media-sharing-ionicframework/

angular.module('app.controllers').controller('socialCtrl', function($scope, $rootScope, $cordovaSocialSharing){

    $scope.shareActivity = function() {
        $cordovaSocialSharing.share("Hey! I just burned " + $rootScope.calburn+ "calories with an activity of on ExersEyes!", "Completed an Actitvity");
        
        $scope.showAlert = function() {
            var justshared = $ionicPopup.alert({
                title: 'Activity Shared!',
                template: 'Sucesfully shared your activity!'
            });
        }
    }
 
});