//Adapted from http://www.gajotres.net/using-cordova-geoloacation-api-with-google-maps-in-ionic-framework/
 
angular.module('app.controllers').controller('MapController', function($scope, $rootScope, $state, $cordovaGeolocation, $ionicPopup,  $ionicLoading, $cordovaVibration) { 
 // initialise vars      
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

    var start = ""
    var end = ""
    var startLoc = ""
    var currentstep = ""
    var stepcounter = 0
    var geoDist = 0 
    var tempDist = 0
    var oldLatLng 
    var steps = []
    var stepLoc = []
    var cburn = 0
    var totalcburn = 0 
    var deltatime = 0 
    var pace = 0
    var time = 0
    var oldtime = 0 
    var t_distance = 0.0
    var dateStart = new Date()
      

        //calculate route        
        calculateRoute(directionsService, directionsDisplay);


        function calculateRoute(directionsService, directionsDisplay){

            console.log("Map: routestart at: " + $rootScope.routestart + " route end at: " + $rootScope.routeend)
            start = "51.523045, -0.039911"
            end = "51.522503, -0.041855"
            
            start = $rootScope.routestart
            end = $rootScope.routeend

            console.log("routestart at: " +  + " route end at: " + $rootScope.routeend)

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

            
// storing array of steps and their locations             

            currentStep = $scope.route.steps[0].instructions;
            stepLoc = $scope.route.steps[0].start_location;

            for (i=0; i<$scope.route.steps.length; i++){
                steps[i] = $scope.route.steps[i].instructions;
                stepLoc[i] = $scope.route.steps[i].start_location;
            }

                    $scope.currStep = steps[0]
                    $scope.stepLoc = stepLoc[0]
                    console.log("current steps: " + currentStep + "length of steps: " + $scope.route.steps.length)

                    $scope.startlatlng = $scope.route.steps[1].start_location;
                    $scope.routedistance = $scope.directionResult.routes[0].legs[0].distance.value;               
        
            console.log("distance covered: " + $scope.routedistance)
            console.log("path overview: " + $scope.overview);
            console.log("path bounds: " + $scope.bounds)

           document.addEventListener("deviceready", onDeviceReady, false);
            onDeviceReady();
        }; // end walkingSteps

// INSERTED LATLNG FINDER

        function onDeviceReady() {
                console.log("user weight: " + $rootScope.weight)

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

// Alerts the user if they are not near the start latlng 
                t_distance = 5.0 // 5 meter threshold 
                var StartMeDelta = google.maps.geometry.spherical.computeDistanceBetween($scope.myLatLng, $scope.startLatLng)

                console.log("distance between me and start" + StartMeDelta)
                if(StartMeDelta > t_distance){

                        navigator.vibrate([50,50]);
                      var alertDistanceFar = $ionicPopup.alert({
                        title: 'Not near start location!',
                        template: 'Get near starting location to begin timer!'
                      });
                      alertDistanceFar.then(function(res) {
                        console.log('user alerted');
                      });
                }else{
// Starts the date for the timer
                    var dateStart = new Date();
                    console.log("date logged for timer" + dateStart)
                }

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
                frequency : 3000, 
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
                    $scope.distTravelled = geoDist.toFixed(0);
                    console.log("GEOMETRICAL DISTANCE TRAVELLED" + $scope.distTravelled)

// Updating the current step          
                    
                    console.log("LINE 206: /// " + stepLoc[stepcounter].lat())
                    distToNextStep =  google.maps.geometry.spherical.computeDistanceBetween(stepLoc[stepcounter+1], $scope.myLatLng); 
                    
                    // if you are within 5m of next step, step updates
                    if(distToNextStep < 5){
                                $scope.currStep = step[stepcounter+1]
                                stepcounter = stepcounter + 1

                    // say the next step
                    TTS
                            .speak({
                                text: $scope.currStep,
                                locale: 'en-GB',
                                rate: 1.5
                            }, function () {
                                //alert('success');
                            }, function (reason) {
                                alert(reason);
                            });
                    }       
//

                    var StartMeDelta = google.maps.geometry.spherical.computeDistanceBetween($scope.myLatLng, $scope.startLatLng)

                    console.log("distance between me and start" + StartMeDelta)
                    if(StartMeDelta > t_distance){

                        navigator.vibrate(50);
                    }else{
    // Starts the date for the timer
                        var dateStart = new Date();
                        console.log("date logged for timer" + dateStart)
                    }


// checks if user is within or out of bounds 
                    $scope.polyline = new google.maps.Polyline({ path: $scope.overview});
                    console.log("route polyline: " + $scope.polyline)

                    $scope.onpolyInner = google.maps.geometry.poly.isLocationOnEdge($scope.myLatLng , $scope.polyline, 10e-7)
                    $scope.onpolyOuter = google.maps.geometry.poly.isLocationOnEdge($scope.myLatLng , $scope.polyline, 10e-5)
                    
                    if($scope.onpolyInner && $scope.onpolyOuter){
                        $scope.boundmessage = "within inner and outerbounds"; 
                    }else if(!$scope.onpolyInner && $scope.onpolyOuter){
                        $scope.boundmessage = "within outer bounds"; 
                    }else{
                        $scope.boundmessage = "not within either inner or outer bounds"; 
                    }

                    if($scope.onpolyInner == false){

                        console.log("you have left the inner bounds");
                         
                        // Vibrate once to indicate out of innerbounds
                        navigator.vibrate(500);

                        TTS
                            .speak({
                                text: 'You are outside inner bounds',
                                locale: 'en-GB',
                                rate: 1.5
                            }, function () {
                                //alert('success');
                            }, function (reason) {
                                alert(reason);
                            });

                        if($scope.onpolyOuter == false){
                            console.log("you have left the outer bounds");
                            
                            // Vibrate twice to indicate out of outerbounds
                            navigator.vibrate([100, 500]);
                           
                            TTS
                                .speak({
                                    text: 'You are outside outer bounds!',
                                    locale: 'en-GB',
                                    rate: 1.5
                                }, function () {
                                //   alert('success');
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

        $scope.sendinfo = function() {

        weight = $rootScope.masteruser.weight
        var dateEnd = new Date();
// test console
        console.log("enddate" + dateEnd)
        console.log("start " + dateStart)

        var deltaDate = dateEnd - dateStart;
        console.log("delta date: " + deltaDate)

        var elapsedTime = (Math.abs(deltaDate) / 1000/60/60) + 0.0001
            elapsedTimeF = elapsedTime.toFixed(1)
        console.log("Elapsed Time: " + elapsedTime)

        var distOfTravel = $scope.distTravelled / 1000
        console.log("Distance travelled: " + distOfTravel)
        // need to reset all values after submitting

        var pace = distOfTravel/elapsedTime // pace in kmh
        console.log("pace: " + pace)


        var a = (0.0215 * Math.pow(3, pace))
        var b = (0.1765 * Math.pow(2, pace))
        var c = (0.8710 * pace)
        var d = weight
        var e = elapsedTime

        console.log(a, b, c, d, e)
        
        var cburn = ((a- b + c) * d * e)
        var cburn = ((0.0215 * Math.pow(3, pace)- (0.1765 * Math.pow(2, pace)) + (0.8710 * pace) + 1.4577) * weight * elapsedTime)
            cburn = cburn.toFixed(1)
        console.log("cburn: " + cburn)

            $rootScope.distanceTravelled = distOfTravel
            $rootScope.timeTaken = elapsedTimeF
            $rootScope.avgPace = pace
            $rootScope.calburn = cburn
                
            $state.go('activityCompleted')  

        dateStart = 0
        dateEnd = 0 
        elapsedTime = 0 
        pace = 0 
        }

});