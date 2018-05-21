(function ( $ ) {

    $.fn.directionsService = function( options ) {

        // Using Google's Directions Service API
        // https://developers.google.com/maps/documentation/javascript/directions

        var directionsService = new google.maps.DirectionsService();
        var element = this;

        // Define default options
        var settings = $.extend({
            start_address: '',
            end_address: '',
            waypoints: '',
            result_container_type: 'container',
            units: 'miles',
            travel_mode: 'DRIVING',
            journey_type: 'single'
        }, options );

        //Create waypoints array & fill it with all locations entered by user
        var waypoints = new Array();
        if (settings.waypoints != ''){
            $.each(settings.waypoints, function(index, value) {
                waypoints.push({
                    location : value,
                    stopover : true
                });
            });
        }

        // Define travel mode
        var travel_mode = '';
        if (settings.travel_mode == 'BICYCLING' || settings.travel_mode == 'CYCLING') {
            travel_mode = google.maps.DirectionsTravelMode.BICYCLING
        }
        else if (settings.travel_mode == 'DRIVING') {
            travel_mode = google.maps.DirectionsTravelMode.DRIVING
        }
        else if (settings.travel_mode == 'TRANSIT' || settings.travel_mode == 'PUBLIC_TRANSPORT') {
            travel_mode = google.maps.DirectionsTravelMode.TRANSIT
        }
        else if (settings.travel_mode == 'WALKING') {
            travel_mode = google.maps.DirectionsTravelMode.WALKING
        }

        // var unit_system = '';
        // if (settings.unit_system == 'imperial') {
        //     unit_system = google.maps.UnitSystem.IMPERIAL;
        // }
        // else {
        //     unit_system = google.maps.UnitSystem.METRIC;
        // }

        // Create a Direction Request variable
        var request = {
            origin: settings.start_address,
            destination: settings.end_address,
            waypoints: waypoints,
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
                    var leg = route.legs[i];
                    distance += leg.distance.value;
                    time += leg.duration.value;
                }

                var final_distance = convertDistance(distance, settings.units, settings.journey_type);

                if (settings.result_container_type == 'container') {
                    return element.html(final_distance);
                }
                else {
                    return element.val(final_distance);
                }
            }
            else {
                var statusText = getDirectionStatusText(status);
                if (settings.result_container_type == 'container') {
                    return element.html(statusText);
                }
                else {
                    return element.val(statusText);
                }
            }
        });

        // Return distance depending on metric or imperial units, and single or return journey
        function convertDistance(distance, units, type) {
            var result = 0;

            if (units == 'miles' || units == 'mile') {
                result = Math.round((((distance*0.621371192)/100) / 10));
            }
            else if (units == 'kilometers' || units == 'kilometer' || units == 'km') {
                result = Math.round(((((distance*0.621371192)/100) / 10) * 1.609344));
            }
            else {
                result = distance.toFixed(1);
            }

            if (type == 'return') {
                return result * 2;
            }

            return result;
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