// Directives handles the DOM manipulation (makes things easier to test)
// Directives allow you to assign controllers and models to individual DOM elements
// E.g. if you want to use a table that will be used everywhere, make it a directive so that 
// 		it can be used in many different places. 

angular.module('app.directives', [])

.directive('blankDirective', [function(){

}])


//parses string to integer wehn required
.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
});

