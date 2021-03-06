
angular.module('app.services', [])


.factory("Activities", function($firebaseArray){

  var auth = "addc-fddb-4bda-8e8e-727196ee33d7"
  var activitiesRef = new Firebase("https://exers-eyes.firebaseio.com/users/"+ auth +"/profile/activities")
  return $firebaseArray(activitiesRef);
})

// AngularJS Service for local storage
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])


