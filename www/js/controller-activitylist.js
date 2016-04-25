angular.module('app.controllers').controller('activityListCtrl', function($scope, $firebaseObject, $ionicPopup) {

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