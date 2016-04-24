angular.module('app.controllers').controller('activityListCtrl', function($scope, $firebaseObject, $ionicPopup) {

    // $scope.list = function() {

    // fbaseAuth = $fbase.getAuth(); 
    //     if(fbaseAuth){
    //         var syncObject = $firebaseObject(fbase.child("users/" + fbaseAuth.uid));
    //         syncObject.$bindTo($scope, "data");
    //     }

    // }

    // $scope.create = function() { 

    //     $ionicPopup.prompt({
    //             title: 'Enter a new activity item',
    //             inputType: 'text'
    //         })
    //         .then(function(result) {
    //             if(result !== "") {
    //                 if($scope.data.hasOwnProperty("activity") !== true) {
    //                     $scope.data.todos = [];
    //                 }
    //                 $scope.data.todos.push({title: result});
    //             } else {
    //                 console.log("Action not completed");
    //             }
    //         });

    // }

    $scope.actlist = [
        {
          'date': '25/3/2016',
          'distance': '2',
          'time' : '15',
          'calories' : '200',
        },
        {
          'date': '17/04/2016',
          'distance': '4',
          'time' : '12',
          'calories' : '190',
        },
        {
          'date': '18/04/2016',
          'distance': '3',
          'time' : '10',
          'calories' : '232',
        },
        {
          'date': '20/04/2016',
          'distance': '4',
          'time' : '12',
          'calories' : '190',
        },
        {
          'date': '21/04/2016',
          'distance': '4',
          'time' : '12',
          'calories' : '120',
        },
        {
          'date': '23/02/2016',
          'distance': '5',
          'time' : '12',
          'calories' : '154',
        }
    ];

});