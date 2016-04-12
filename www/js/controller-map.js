// does nothing below :(

angular.module('app.controllers').controller('mapController', function($scope){

    google.maps.event.addDomListener(window, "load", function() {

        // def centre point
        var myLatLng = new google.maps.LatLng(37.300, -120.4833);

        var mapOptions = {
            center: myLatLng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        navigator.geolocation.getCurrentPosition(function(pos){
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        });

        $scope.map = map;

  
    });

});