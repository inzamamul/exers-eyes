scratchpad

// JS found in activity in progress. unsure if needed?!


		<script>
		var x = document.getElementById("demo");

		function getLocation() {
		    if (navigator.geoLocation) {
		        navigator.geoLocation.getCurrentPosition(showPosition);
		    } else { 
		        x.innerHTML = "Geolocation is not supported by this browser.";
		    }
		}

		function showPosition(position) {
		    x.innerHTML = "Latitude: " + position.coords.latitude + 
		    "<br>Longitude: " + position.coords.longitude;	
		}
		</script>