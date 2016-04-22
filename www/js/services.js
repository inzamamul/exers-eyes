// Template - for reusing factory and services 
  
  //.factory('BlankFactory', [function(){
  // }])


  // .service('BlankService', [function(){
  // }])

angular.module('app.services', [])

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

// Adapted from http://jsfiddle.net/27mk1n1o/
.factory('RouteFactory', [function(){

  var chosenRoute = [];
  return {

    getRoute: function() {
      return chosenRoute; 

  }, 
    setRouteName: function(routename) {
      chosenRoute.name = routename;
    },

    setRouteStart: function(routeStart) {
      chosenRoute.startLoc =  routeStart;
    },

    setRouteEnd: function(routeStart) {
      chosenRoute.endLoc = routeStart;
    }


  };
}])
