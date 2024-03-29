(function ( $ ) {

    $.fn.distanceMatrixService = function( options ) {

        // Using Google's Distance Matrix Service API
        // https://developers.google.com/maps/documentation/javascript/distancematrix

        var distanceMatrixService = new google.maps.DistanceMatrixService();

        // Define default options
        var settings = $.extend({
            start_address: '',
            end_address: '',
            waypoints: '',
            units: 'MILES',
            mode: 'DRIVING'
        }, options);

        // Define waypoints
        var waypoints = new Array();

        if (settings.waypoints != '') {
            $.each(settings.waypoints, function(index, value) {
                waypoints.push({
                    location: value,
                    stopover: true
                });
            });
        }

        // Define travel mode
        var travel_mode = '';

        if (settings.travel_mode == 'BICYCLING') {
            travel_mode = google.maps.TravelMode.BICYCLING;
        }
        else if (settings.travel_mode == 'DRIVING') {
            travel_mode = google.maps.TravelMode.DRIVING;
        }
        else if (settings.travel_mode == 'TRANSIT') {
            travel_mode = google.maps.TravelMode.TRANSIT;
        }
        else if (settings.travel_mode == 'WALKING') {
            travel_mode = google.maps.TravelMode.WALKING;
        }

        // Define units
        var unit_system = '';

        if (settings.units == 'IMPERIAL' || settings.units == 'MILES') {
            unit_system = google.maps.UnitSystem.IMPERIAL;
        }
        else if (settings.units == 'METRIC' || settings.units == 'KILOMETERS') {
            unit_system = google.maps.UnitSystem.METRIC;
        }

        // Create a distance matrix request variable
        var request = {
            origin: settings.start_address,
            destination: settings.end_address,
            waypoints: waypoints,
            optimizeWaypoints: true,
            unitSystem: unit_system,
            travelMode: travel_mode
        };

        // Execute the distance matrix service
        distanceMatrixService.getDistanceMatrix(request, function(response, status) {

        });

        // Get the Map direction status message
        function getDistanceMatrixStatusText(status) {
            switch (status) {
                case google.maps.DistanceMatrixStatus.INVALID_REQUEST :
                    return "Invalid request. The provided request was invalid. This is often due to missing required fields.";
                case google.maps.DistanceMatrixStatus.MAX_ELEMENTS_EXCEEDED :
                    return "Maximum elements exceeded. The product of origins and destinations exceeds the per-query limit.";
                case google.maps.DistanceMatrixStatus.MAX_DIMENSIONS_EXCEEDED :
                    return "Maximum dimensions exceeded. Your request contained more than 25 origins, or more than 25 destinations";
                case google.maps.DistanceMatrixStatus.OVER_QUERY_LIMIT :
                    return "Over query limit. Your application has requested too many elements within the allowed time period. The request should succeed if you try again after a reasonable amount of time.";
                case google.maps.DistanceMatrixStatus.REQUEST_DENIED :
                    return "Request denied. The service denied use of the Distance Matrix service by your web page.";
                case google.maps.DistanceMatrixStatus.UNKNOWN_ERROR :
                    return "Unknown error. A Distance Matrix request could not be processed due to a server error. The request may succeed if you try again.";
                case google.maps.DistanceMatrixStatus.NOT_FOUND :
                    return "Not found. The origin and/or destination of this pairing could not be geocoded.";
                case google.maps.DistanceMatrixStatus.ZERO_RESULTS :
                    return "Zero results. No route could be found between the origin and destination.";
                default:
                    return status;
            }
        }

        // var directionsService = new google.maps.DirectionsService();
        // var this_element = this;

        // // Define default options
        // var settings = $.extend({
        //     start_address: "",
        //     end_address: "",
        //     waypoints: "",
        //     result_container_type: "container",
        //     units: "mile",
        //     travel_mode: "DRIVING",
        // }, options );

        // //Create waypoints array & fill it with all locations entered by user
        // var waypts = new Array();
        // if(settings.waypoints!=""){
        //     $.each(settings.waypoints, function(index, value) {
        //         waypts.push({
        //             location : value,
        //             stopover : true
        //         });
        //     });
        // }

        // // Define travel mode
        // var travel_mode = "";
        // if(settings.travel_mode=='DRIVING')
        //     travel_mode = google.maps.DirectionsTravelMode.DRIVING
        // else
        // if(settings.travel_mode=='BICYCLING')
        //     travel_mode = google.maps.DirectionsTravelMode.BICYCLING
        // else
        // if(settings.travel_mode=='TRANSIT')
        //     travel_mode = google.maps.DirectionsTravelMode.TRANSIT
        // else
        // if(settings.travel_mode=='WALKING')
        //     travel_mode = google.maps.DirectionsTravelMode.WALKING

        // // Create a Direction Request variable
        // var request = {
        //     origin: settings.start_address,
        //     destination: settings.end_address,
        //     waypoints: waypts,
        //     optimizeWaypoints: true,
        //     unitSystem: google.maps.UnitSystem.IMPERIAL,
        //     travelMode: travel_mode
        // };

        // // Execute the Route Method to get Distance
        // directionsService.route(request, function(response, status) {

        //     if (status == google.maps.DirectionsStatus.OK) {
        //         var route = response.routes[0];

        //         // calculate total distance and duration
        //         var distance = 0;
        //         var time = 0;

        //         for (var i=0; i<route.legs.length; i++) {
        //             var theLeg = route.legs[i];
        //             distance += theLeg.distance.value;
        //             time += theLeg.duration.value;
        //         }
        //         var final_distance = convertDistance(distance, settings.units);
        //         if(settings.result_container_type=='container')
        //             return this_element.html(final_distance);
        //         else
        //             return this_element.val(final_distance);
        //     }
        //     else {
        //         var statusText = getDirectionStatusText(status);
        //         if(settings.result_container_type=='container')
        //             return this_element.html(statusText);
        //         else
        //             return this_element.val(statusText);
        //     }
        // });

        // // Show distance in different measurements
        // function convertDistance(distance, units) {
        //     if(units=='mile') {
        //         // return (((distance*0.621371192)/100) / 10).toFixed(1);
        //         return Math.round((((distance*0.621371192)/100) / 10));
        //     }
        //     else if(units=='kilometer') {
        //         // return ((((distance*0.621371192)/100) / 10) * 1.609344).toFixed(1);
        //         return Math.round(((((distance*0.621371192)/100) / 10) * 1.609344));
        //     }
        //     else {
        //         return distance.toFixed(1);
        //     }
        // }

        // // Get the Map direction status message
        // function getDirectionStatusText(status){
        //     switch(status){
        //         case google.maps.DirectionsStatus.INVALID_REQUEST :
        //             return "Invalid request";
        //         case google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED :
        //             return "Maximum waypoints exceeded";
        //         case google.maps.DirectionsStatus.NOT_FOUND :
        //             return "Not found";
        //         case google.maps.DirectionsStatus.OVER_QUERY_LIMIT :
        //             return "Over query limit";
        //         case google.maps.DirectionsStatus.REQUEST_DENIED :
        //             return "Request denied";
        //         case google.maps.DirectionsStatus.UNKNOWN_ERROR :
        //             return "Unknown error";
        //         case google.maps.DirectionsStatus.ZERO_RESULTS :
        //             return "Zero results";
        //         default:
        //             return status;
        //     }
        // }
    };

}( jQuery ));