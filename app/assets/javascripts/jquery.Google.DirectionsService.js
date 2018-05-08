(function ( $ ) {

    $.fn.directionsService = function( options ) {

        // Using Google's Directions Service API
        // https://developers.google.com/maps/documentation/javascript/directions

        var directionsService = new google.maps.DirectionsService();

        // Define default options
        var settings = $.extend({
            start_address: "",
            end_address: "",
            waypoints: "",
            result_container_type: "container",
            units: "miles",
            travel_mode: "DRIVING",
        }, options );

        //Create waypoints array & fill it with all locations entered by user
        var waypts = new Array();
        if (settings.waypoints!=""){
            $.each(settings.waypoints, function(index, value) {
                waypts.push({
                    location : value,
                    stopover : true
                });
            });
        }

        // Define travel mode
        var travel_mode = "";
        if (settings.travel_mode == 'BICYCLING') {
            travel_mode = google.maps.DirectionsTravelMode.BICYCLING
        }
        else if (settings.travel_mode == 'DRIVING') {
            travel_mode = google.maps.DirectionsTravelMode.DRIVING
        }
        else if (settings.travel_mode == 'TRANSIT') {
            travel_mode = google.maps.DirectionsTravelMode.TRANSIT
        }
        else if (settings.travel_mode == 'WALKING') {
            travel_mode = google.maps.DirectionsTravelMode.WALKING
        }

        // Create a Direction Request variable
        var request = {
            origin: settings.start_address,
            destination: settings.end_address,
            waypoints: waypts,
            optimizeWaypoints: true,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            travelMode: travel_mode
        };

        // Execute the Route Method to get Distance
        directionsService.route(request, function(response, status) {

            if (status == google.maps.DirectionsStatus.OK) {
                var route = response.routes[0];

                // calculate total distance and duration
                var distance = 0;
                var time = 0;

                for (var i = 0; i < route.legs.length; i++) {
                    var theLeg = route.legs[i];
                    distance += theLeg.distance.value;
                    time += theLeg.duration.value;
                }

                var final_distance = convertDistance(distance, settings.units);

                if (settings.result_container_type == 'container') {
                    return this.html(final_distance);
                }
                else {
                    return this.val(final_distance);
                }
            }
            else {
                var statusText = getDirectionStatusText(status);
                if (settings.result_container_type == 'container') {
                    return this.html(statusText);
                }
                else {
                    return this.val(statusText);
                }
            }
        });

        // Show distance in different measurements
        function convertDistance(distance, units) {
            if (units == 'miles') {
                // return (((distance*0.621371192)/100) / 10).toFixed(1);
                return Math.round((((distance*0.621371192)/100) / 10));
            }
            else if (units == 'kilometers') {
                // return ((((distance*0.621371192)/100) / 10) * 1.609344).toFixed(1);
                return Math.round(((((distance*0.621371192)/100) / 10) * 1.609344));
            }
            else {
                return distance.toFixed(1);
            }
        }

        // Get the Map direction status message
        function getDirectionStatusText(status) {
            switch (status) {
                case google.maps.DirectionsStatus.INVALID_REQUEST :
                    return "Invalid request. The provided DirectionsRequest was invalid. The most common causes of this error code are requests that are missing either an origin or destination, or a transit request that includes waypoints.";
                case google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED :
                    return "Maximum waypoints exceeded. Too many waypoint fields were provided in the request.";
                case google.maps.DirectionsStatus.MAX_ROUTE_LENGTH_EXCEEDED :
                    return "Maximum route length exceeded. The requested route is too long and cannot be processed. This error occurs when more complex directions are returned. Try reducing the number of waypoints, turns, or instructions.";
                case google.maps.DirectionsStatus.NOT_FOUND :
                    return "Not found. At least one of the locations specified in the request's origin, destination, or waypoints could not be geocoded.";
                case google.maps.DirectionsStatus.OVER_QUERY_LIMIT :
                    return "Over query limit. The webpage has sent too many requests within the allowed time period.";
                case google.maps.DirectionsStatus.REQUEST_DENIED :
                    return "Request denied. The webpage is not allowed to use the directions service.";
                case google.maps.DirectionsStatus.UNKNOWN_ERROR :
                    return "Unknown error. A directions request could not be processed due to a server error. The request may succeed if you try again.";
                case google.maps.DirectionsStatus.ZERO_RESULTS :
                    return "Zero results. No route could be found between the origin and destination.";
                default:
                    return status;
            }
        }
    };

}( jQuery ));