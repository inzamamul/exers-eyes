// Directives handles the DOM manipulation (makes things easier to test)
// Directives allow you to assign controllers and models to individual DOM elements
// E.g. if you want to use a table that will be used everywhere, make it a directive so that 
// 		it can be used in many different places. 

angular.module('app.directives', [])

.directive('blankDirective', [function(){

}])

.directive('demoMap',function(){
  return {
    restrict: 'EA',
    require: '?ngModel',
    scope:{
        myModel: '=ngModel'
    },
    link: function(scope,element,attrs,ngModel){
        
      var mapOptions;
      var googleMap;
      var searchMarker;
      var searchLatLng;
      
      ngModel.$render = function(){
        searchLatLng = new google.maps.LatLng(scope.myModel.latitudeCtrl, scope.myModel.longitudeCtrl);

        mapOptions = {
            center: searchLatLng,
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
            
        googleMap = new google.maps.Map(element[0],mapOptions);

        searchMarker = new google.maps.Marker({
          position: searchLatLng,
          map: googleMap,
          draggable: true
        });
        
        google.maps.event.addListener(searchMarker, 'dragend', function(){
          scope.$apply(function(){
            scope.myModel.latitudeCtrl = searchMarker.getPosition().lat();
            scope.myModel.longitudeCtrl = searchMarker.getPosition().lng();
          });
        }.bind(this));
        
      };
      
      scope.$watch('myModel', function(value){
        var myPosition = new google.maps.LatLng(scope.myModel.latitudeCtrl, scope.myModel.longitudeCtrl);
        searchMarker.setPosition(myPosition);
      }, true);
    }      
  }
});

