//Adapted from http://www.gajotres.net/using-cordova-geoloacation-api-with-google-maps-in-ionic-framework/
 
angular.module('app.controllers').controller('MapController', function($scope, $cordovaGeolocation, RouteFactory,  $ionicLoading, $cordovaVibration, $rootScope) { 

    // Get routes from routeFactory 
    $scope.$watch(function (){
        return RouteFactory.getRoute();
    }, 
    
    function(newRoute, oldRoute){
    if (newRoute !== oldRoute)
        $scope.chosenRoute = newRoute;
        console.log("mapctrller route: " + $scope.chosenRoute )
    });

// 1. Check if near route 1. Plot Route 2. Provide Directions 3. Locate yourself
 
    var start = "" // start latlng of route
    var end = "" // end latlng of route
    var distThresh = 5 // distance Threshold for checking if the user is near start lcoation or not 

    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;  

        $scope.checkIfClose = function() {

            if($scope.chosenRoute!=null){
                start = $scope.chosenRoute
            }else{
                console.log("scope routestart is null")
                  start = "51.543963, -0.032926"
                  start = new google.maps.LatLng("51.543963", "-0.032926")
            }

            if($scope.chosenRoute!= null){
                end = $scope.chosenRoute
            }else{
                console.log("scope routeend is null")
                end = "51.518631, -0.035189"
            }        

            var posOptions = {
                enableHighAccuracy: true,
                timeout : 100000,
                maximumAge: 3600000
            };

            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                $scope.mylat = position.coords.latitude;
                $scope.mylong = position.coords.longitude;

                $scope.myLatlng = new google.maps.LatLng($scope.mylat, $scope.mylong);
            })

//// NEED TO FIX 
//// NOT GETTING THE LAT LONG STORED IN MYLATLONG

            console.log(start + "WHAT THE FUCK " + $scope.mylat )

            $scope.distfromstart = google.maps.geometry.spherical.computeDistanceBetween(start, $scope.myLatLng)

            if($scope.distfromstart > distThresh){

                console.log("You are too far away!")
            }else{
                console.log("Proceed with route. ")
            }


        }
    
    

        function calculateRoute(directionsService, directionsDisplay){


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
console.log("overviewpath: " + $scope.overview)            
console.log("overviewpoly: " + directionResult.routes[0].overview_polyline)
//            $scope.polyline = google.maps.geometry.encoding.decodePath(directionResult.routes[0].overview_polyline);


console.log("route polyline: " + $scope.polyline)

var cascadiaFault = new google.maps.Polyline({
    path: [
      new google.maps.LatLng(49.95, -128.1),
      new google.maps.LatLng(46.26, -126.3),
      new google.maps.LatLng(40.3, -125.4)
    ]
  });

console.log("route cascadia: " + cascadiaFault)


var myPosition = new google.maps.LatLng(40.301, -125.4);


            var onpoly = false; 
            var onpoly = google.maps.geometry.poly.isLocationOnEdge(myPosition, cascadiaFault, 10e-2)
            

            $scope.onpoly = onpoly
            console.log("if on line: " + $scope.onpoly)

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

    initializeMe();

    var mapOptions = {
        center: $scope.myLatlng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: false
    };    


// INSERTED LATLNG FINDER

        function initializeMe() {
             
// $ionicLoading.show({
//     template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
// });
             
            var posOptions = {
                enableHighAccuracy: true,
                timeout : 100000,
                maximumAge: 3600000
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

// $ionicLoading.hide();  
                     //calculate route
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
                   
                    $scope.mylat = position.coords.latitude
                    $scope.mylong= position.coords.longitude

                    $scope.myLatlng = new google.maps.LatLng($scope.mylat, $scope.mylong);  
                    $scope.searchMarker.setPosition($scope.myLatlng);
                    

            console.log("scope.latlng: " + $scope.myLatlng + " scope: poly: " + $scope.polyline)
//            $scope.onpoly = google.maps.geometry.poly.isLocationOnEdge($scope.myLatlng , $scope.polyline)
//            console.log("if on line: " + $scope.onpoly)

                } // end watch
            );

        } // end initializeme

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