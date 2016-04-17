// Controller for sharing via social channels 
//https://www.thepolyglotdeveloper.com/2014/10/implement-social-media-sharing-ionicframework/

angular.module('app.controllers').controller('socialCtrl', function($scope, $cordovaSocialSharing){

    $scope.shareActivity = function() {
        $cordovaSocialSharing.share("I just completed an activity on ExersEyes!", "Completed and Actitvity", "www/img/exerseyes.png", "www.eecs.qmul.ac.uk");
    }
 
    // $scope.shareViaTwitter = function(message, image, link) {
    //     $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
    //         $cordovaSocialSharing.shareViaTwitter(message, image, link);
    //     }, function(error) {
    //         alert("Cannot share on Twitter");
    //     });
    // }

});