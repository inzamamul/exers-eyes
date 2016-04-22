//Adapted from http://www.gajotres.net/using-cordova-geoloacation-api-with-google-maps-in-ionic-framework/
 
angular.module('app.controllers').controller('MapController', function($scope, $rootScope, $cordovaGeolocation, $ionicLoading, $cordovaVibration) { 


// 1. Check if near route 1. Plot Route 2. Provide Directions 3. Locate yourself
 
    var start = "" // start latlng of route
    var end = "" // end latlng of route
    var distThresh = 5 // distance Threshold for checking if the user is near start lcoation or not 


        document.addEventListener("deviceready", initialized, false);


// INSERTED LATLNG FINDER

        function initialized() {
            
            var posOptions = {
                enableHighAccuracy: true,
                timeout : 100000,
                maximumAge: 3600000
            };

            var mapOptions = {
                center: $scope.myLatlng,
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                draggable: false
            };                
            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);    

            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                $scope.mylat = position.coords.latitude;
                $scope.mylong = position.coords.longitude;

                $scope.myLatlng = new google.maps.LatLng($scope.mylat, $scope.mylong);
                    
                $scope.searchMarker = new google.maps.Marker({
                    position: $scope.myLatlng,
                    map: $scope.map,
                    // icon: 'http://i.stack.imgur.com/orZ4x.png',
                    draggable: false
                });

            //calculate route
            var directionsDisplay = new google.maps.DirectionsRenderer;
            var directionsService = new google.maps.DirectionsService;  

            calculateRoute(directionsService, directionsDisplay);

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
                      console.log("watch error!!!")
                },
                function(position) {
                    //calculate route
                    calculateRoute(directionsService, directionsDisplay);
                   
                    $scope.mylat = position.coords.latitude
                    $scope.mylong= position.coords.longitude

                    $scope.myLatlng = new google.maps.LatLng($scope.mylat, $scope.mylong);  
                    $scope.searchMarker.setPosition($scope.myLatlng);

                } // end watch
            );

        } // end initializeMe

        function calculateRoute(directionsService, directionsDisplay){

            if($rootScope.routestart != ""){
                start = $rootScope.routestart 
            }else{
                console.log("scope routestart is empty")
                console.log($rootScope.routestart )
                  start = "51.523045, -0.039911"
            }

            if($rootScope.routeend!= "" ){
                end = $rootScope.routeend
            }else{
                console.log("scope routeend is empty")
                end = "51.522503, -0.041855"
            }

            directionsService.route({
                origin: start, 
                destination: end,
                travelMode: google.maps.TravelMode.WALKING
            }, function(response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        

                        directionsDisplay.setDirections(response);
                        walkingSteps(response);
//                        amInear(); // check i am near first waypoint in directions

                    }else {
                        console.log("directions service failed");
                        // change this later to ionic popup window
                    }
            });
        }; // end calculateRoute

        function walkingSteps(directionResult){

            var currentstep; 
            var route = directionResult.routes[0].legs[0];

            $scope.overview = directionResult.routes[0].overview_path
            $scope.bounds = directionResult.routes[0].bounds
//console.log("overviewpath: " + $scope.overview)            
// console.log("overviewpoly: " + directionResult.routes[0].overview_polyline)
//            $scope.polyline = google.maps.geometry.encoding.decodePath(directionResult.routes[0].overview_polyline);
            
            $scope.polyline = new google.maps.Polyline({ path: $scope.overview });
            console.log("LINE 155: mylatlong: " + $scope.myLatlng + " myoverviewpoly: " + $scope.polyline)


            var onpolyInner = false; 
            var onpolyInnner = google.maps.geometry.poly.isLocationOnEdge($scope.myLatlng, $scope.polyline, 10e-8)

            var onpolyOuter = false;
            var onpolyOuter= google.maps.geometry.poly.isLocationOnEdge($scope.myLatlng, $scope.polyline, 10e-6)

            $scope.onpolyInner = onpolyInner
            $scope.onpolyOuter = onpolyOuter

            if(!$scope.onpolyInner){
                    // user is not within bounds
                console.log("user is outside inner polyline bounds ")
                document.addEventListener('deviceready', function () {
               
                // Vibrate test
                navigator.vibrate(500);

                // Text To Speech (TTS)
                TTS
                    .speak({
                        text: 'You are outside inner bounds!',
                        locale: 'en-GB',
                        rate: 1.5
                    }, function () {
                        alert('Get back on route!');
                    }, function (reason) {
                        alert(reason);
                    });
                }, false);  

                if(!$scope.onpolyOuter){
                    // user is not within bounds
                console.log("user is outside outer polyline bounds ")
                document.addEventListener('deviceready', function () {
               
                // Vibrate test
                navigator.vibrate(500);
                navigator.vibrate(500);

                // Text To Speech (TTS)
                TTS
                    .speak({
                        text: 'You are outside outer bounds!',
                        locale: 'en-GB',
                        rate: 1.5
                    }, function () {
                        alert('Get back on route!');
                    }, function (reason) {
                        alert(reason);
                    });
                }, false);  

                
            }

            }

    // arbitary looking for a single step in route[] >> will need to change so it follows users geoLoc
    // if step has passed a overview array item then go to next step 

            currentStep = route.steps[0].instructions;
            $scope.currStep = currentStep
            console.log(currentStep)

            $scope.startlatlng = route.steps[1].start_location;
            $scope.routedistance = directionResult.routes[0].legs[0].distance.value;

            console.log("distance covered: " + $scope.routedistance)
 //console.log("path overview: " + $scope.overview);
            console.log("path bounds: " + $scope.bounds)

            directionsDisplay.setMap($scope.map);
            directionsDisplay.setPanel(document.getElementById('directionsPanel'));

        }; // end walkingSteps

// call the google matrix api somehwere here to see distance travelled based on your startLoc and your current LatLng

    //     function amInear() {


    // console.log("line169 " + $scope.startlatlng.lat())
    //         var tmpdelta= Math.abs($scope.startlatlng.lat() - $scope.mylat);
    // console.log("line171 " + tmpdelta)       
    //         $scope.delta = tmpdelta.toFixed(5);

    //         console.log("lat of first marker: " + $scope.startlatlng.lat())
    //         console.log("lat of me: " + $scope.mylat )
    //         console.log("difference between me and marker: " + $scope.delta)
            
    //         if( $scope.delta > 0.0001){
    //             return $scope.isnear = true;
    //         }else{
    //             return $scope.isnear = false;
    //         }
        
    //     };
});