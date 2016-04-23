//Adapted from http://www.gajotres.net/using-cordova-geoloacation-api-with-google-maps-in-ionic-framework/
 
angular.module('app.controllers').controller('MapController', function($scope,  $rootScope, $cordovaGeolocation, $ionicLoading, $cordovaVibration) { 
     
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

    var start = ""
    var end = ""
    var startLoc = ""
    var currentstep = ""
    var stepcounter = 0; 
    var geoDist
        geoDist = 0 
    var tempDist
        tempDist = 0
    var oldLatLng 
         //calculate route
        
        calculateRoute(directionsService, directionsDisplay);


        function calculateRoute(directionsService, directionsDisplay){

            start = "51.523045, -0.039911"
            end = "51.522503, -0.041855"

            startLat = start.split(",")[0];
            startLng = start.split(",")[1];

            endLat = end.split(",")[0];
            endLng = end.split(",")[1];

// storing google latlng objects from the start and end latlng 
            $scope.startLatLng = new google.maps.LatLng(startLat, startLng);
            $scope.endLatLng = new google.maps.LatLng(endLat, endLng);

            
            directionsService.route({
                origin: start, 
                destination: end,
                travelMode: google.maps.TravelMode.WALKING
            }, function(response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        


                        directionsDisplay.setDirections(response); // displays directions on maps
                        walkingSteps(response);

                    }else {
                        console.log("directions service failed");
                        // change this later to ionic popup window
                    }
            });
        }; // end calculateRoute

        function walkingSteps(directionResult){

           
            $scope.route = directionResult.routes[0].legs[0];

            $scope.overview = directionResult.routes[0].overview_path
            $scope.bounds = directionResult.routes[0].bounds
            $scope.directionResult = directionResult

    // arbitary looking for a single step in route[] >> will need to change so it follows users geoLoc
    // if step has passed a overview array item then go to next step 

         
            console.log("distance covered: " + $scope.routedistance)
            console.log("path overview: " + $scope.overview);
            console.log("path bounds: " + $scope.bounds)

           document.addEventListener("deviceready", onDeviceReady, false);
            onDeviceReady();
        }; // end walkingSteps

// INSERTED LATLNG FINDER

        function onDeviceReady() {
               
            var posOptions = {
                enableHighAccuracy: true,
                timeout : 100000,
                maximumAge: 3600000
            };
         
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                $scope.lat = position.coords.latitude;
                $scope.long = position.coords.longitude;
                
                $scope.myLatLng = new google.maps.LatLng($scope.lat , $scope.long);
                
                oldLatLng = $scope.myLatLng

// // if location is not nearby start point of the route  

//                 var service = new google.maps.DistanceMatrixService; 
//                 service.getDistanceMatrix({
//                     origins: start, 
//                     destinations: end, 
//                     travelModel: google.maps.TravelMode.WALKING, 
//                     unitSystem: google.maps.UnitSystem.METRIC, 
//                 }, function(response, status) {
//                     if(status !== google.maps.DistanceMatrixStatus.OK){
//                         alert('there was an error'); 
//                     }else{
//                         $scope.startDistance = response.originAddresses; 
//                     }
//                 })
//                 console.log("ifnearstartloc: " + $scope.startDistance)

// ////
                var mapOptions = {
                    center: $scope.myLatLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    draggable: false   
                };          
                
                $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);          
                     
                $scope.searchMarker = new google.maps.Marker({
                    position: $scope.myLatLng,
                    map: $scope.map,
                    // icon: 'http://i.stack.imgur.com/orZ4x.png',
                    draggable: false
                });

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

// updating new latlongs

                    $scope.lat  = position.coords.latitude
                    $scope.long = position.coords.longitude

                    $scope.shortlat = $scope.lat.toFixed(4);
                    $scope.shortlong = $scope.long.toFixed(4)
                
                    $scope.myLatLng = new google.maps.LatLng($scope.lat, $scope.long);  
                    $scope.searchMarker.setPosition($scope.myLatLng);

// Calculating Distance Travelled 

                    tempDist = google.maps.geometry.spherical.computeDistanceBetween($scope.myLatLng, oldLatLng); 
                    console.log("tempDist travelled: " + tempDist)
                    geoDist = geoDist + tempDist
                    $scope.distTravelled = geoDist
                    console.log("GEOMETRICAL DISTANCE TRAVELLED" + $scope.distTravelled)

// seeing how many steps we've passed
                   
                    currentStep = $scope.route.steps[0].instructions;
                    $scope.currStep = currentStep
                    console.log("current steps: " + currentStep + "length of steps: " + $scope.route.steps.length)

                    for (i = 0; i < $scope.route.steps.length; i++) { 
                      
                           console.log($scope.route.steps[i].instructions);
                           console.log($scope.route.steps[i].end_location.lat() + " " + $scope.route.steps[i].end_location.lng())
                            
                        
                            stepcounter = stepcounter + 1; 
                            console.log("step distance " + $scope.stepdistance)
                    }

                    $scope.startlatlng = $scope.route.steps[1].start_location;
                    $scope.routedistance = $scope.directionResult.routes[0].legs[0].distance.value;     

// checks if user is within or out of bounds 
                    $scope.polyline = new google.maps.Polyline({ path: $scope.overview});
                    console.log("route polyline: " + $scope.polyline)

                    $scope.onpolyInner = google.maps.geometry.poly.isLocationOnEdge($scope.myLatLng , $scope.polyline, 10e-7)
                    $scope.onpolyOuter = google.maps.geometry.poly.isLocationOnEdge($scope.myLatLng , $scope.polyline, 10e-5)
                    
                    if($scope.onpolyOuter){
                        $scope.withouter = "within outer bounds"; 
                    }if ($scope.onpolyInner){
                        $scope.withinner= "within inner bounds"; 
                    }

                    if($scope.onpolyInner == false){

                        console.log("you have left the inner bounds");
                              // Vibrate test
                        navigator.vibrate(500);

                        // or with more options
                        TTS
                            .speak({
                                text: 'You are outside inner bounds',
                                locale: 'en-GB',
                                rate: 1.5
                            }, function () {
                                alert('success');
                            }, function (reason) {
                                alert(reason);
                            });

                        if($scope.onpolyOuter == false){
                            console.log("you have left the outer bounds");
                                // Vibrate test
                            navigator.vibrate(500);
                            navigator.vibrate(500);
                            // or with more options
                            TTS
                                .speak({
                                    text: 'You are outside outer bounds!',
                                    locale: 'en-GB',
                                    rate: 1.5
                                }, function () {
                                    alert('success');
                                }, function (reason) {
                                    alert(reason);
                                });
                            }

                    } // if not within inner bounds 

                    // loop through instructions after pass of each end marker 
 
                oldLatLng = $scope.myLatLng 
                } // end watch do 
           
            ); // end watch then

        } // end when device ready 

});