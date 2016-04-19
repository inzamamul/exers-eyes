
//Adapted from http://www.gajotres.net/using-cordova-geoloacation-api-with-google-maps-in-ionic-framework/
 
app.controller('MapController', function($scope, $cordovaGeolocation, $ionicLoading) { 
     
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

         //calculate route
        calculateRoute(directionsService, directionsDisplay);

        function calculateRoute(directionsService, directionsDisplay){
            var start = ""
            var end = ""
          
            if($scope.routestart!=null){
                start = $scope.routestart
            }else{
                console.log("scope routestart is null")
                  start = "51.524076, -0.037211"
            }

            if($scope.routeend!= null){
                end = $scope.routeend
            }else{
                console.log("scope routeend is null")
                end = "51.522921, -0.036149"
            }

            directionsService.route({
                origin: start, 
                destination: end,
                travelMode: google.maps.TravelMode.WALKING
            }, function(response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        
                        document.addEventListener("deviceready", onDeviceReady, false);

                        directionsDisplay.setDirections(response);
                        walkingSteps(response);
                        amInear(); // check i am near first post

                    }else {
                        console.log("directions service failed");
                        // change this later to ionic popup window
                    }
            });
        }; // end calculateRoute

        function walkingSteps(directionResult){

            var currentstep; 
            var route = directionResult.routes[0].legs[0];

    // arbitary looking for a single step in route[] >> will need to change so it follows users geoLoc          
            currentStep = route.steps[1].instructions;
            $scope.currStep = currentStep
            console.log(currentStep)

            $scope.startlatlng = route.steps[1].start_location;
            $scope.routedistance = directionResult.routes[0].legs[0].distance.value;

            console.log("distance covered: " + $scope.routedistance)
            amInear();

        }; // end walkingSteps

// INSERTED LATLNG FINDER

        function onDeviceReady() {
             
// $ionicLoading.show({
//     template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
// });
             
            var posOptions = {
                enableHighAccuracy: true,
                timeout : 100000,
                maximumAge: 3600000
            };
         
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                var lat  = position.coords.latitude;
                var longi = position.coords.longitude;
                
                $scope.latt = lat
                $scope.longg = longi 


                $scope.myLatlng = new google.maps.LatLng($scope.latt, $scope.longg);
                
                var mapOptions = {
                    center: $scope.myLatlng,
                    zoom: 10,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    draggable: false    
                };          
                
                $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);          
                     
                $scope.searchMarker = new google.maps.Marker({
                    position: $scope.myLatlng,
                    map: $scope.map,
                    // icon: 'http://i.stack.imgur.com/orZ4x.png',
                    draggable: false
                });
//ITWORKS
                directionsDisplay.setMap($scope.map);
                directionsDisplay.setPanel(document.getElementById('directionsPanel'));
          
// $ionicLoading.hide();  
       
            },  function(err) 
            {
                console.log(err);
            });

// watching latlong
            var watchOptions = {
                frequency : 1000, 
                timeout : 100000, 
                maximumAge: 3600000,// 
                enableHighAccuracy: false // may cause errors if true
            };

            var watch = $cordovaGeolocation.watchPosition(watchOptions);
            
            watch.then(
                null,
                function(err) {
                      // error
                },
                function(position) {
                   
                    var lat  = position.coords.latitude
                    var longi = position.coords.longitude
                    $scope.latt = lat
                    $scope.longg = longi 

                    $scope.myLatlng = new google.maps.LatLng($scope.latt, $scope.longg);  
                    $scope.searchMarker.setPosition($scope.myLatlng);
                    amInear();
                }
            );

        } // end when device ready 

        function amInear() {

    console.log("line169" + $scope.startlatlng.lat())
            var tmpdelta= Math.abs($scope.startlatlng.lat() - $scope.latt);
    console.log("line171" + tmpdelta)       
            $scope.delta = tmpdelta.toFixed(5);

            console.log("lat of first marker: " + $scope.startlatlng.lat())
            console.log("lat of me: " + $scope.latt )
            console.log("difference between me and marker: " + $scope.delta)
            
            if( $scope.delta > 0.0001){
                return $scope.isnear = true;
            }else{
                return $scope.isnear = false;
            }
        };
});