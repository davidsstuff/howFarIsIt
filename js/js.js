    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    var map = new GMaps({
        div: '#map',
        lat: 54,
        lng: -3.1167,
        zoom: 5
    });

    map.drawRoute({
        origin: [51.5286417, -0.1015987],
        destination: [55.9410656, -3.2053836],
        travelMode: 'walking',
        strokeColor: '#131540',
        strokeOpacity: 0.6,
        strokeWeight: 6
    });

    function drawNewRoute(george) {

        map.removePolylines();

        GMaps.geocode({
            address: document.getElementById("start").value,
            callback: function(results, status) {
                if (status == 'OK') {
                    startlatlng = results[0].geometry.location;


                    GMaps.geocode({
                        address: document.getElementById("end").value,
                        callback: function(results, status) {
                            if (status == 'OK') {
                                endlatlng = results[0].geometry.location;


                                map.drawRoute({
                                    origin: [startlatlng.lat(), startlatlng.lng()],
                                    destination: [endlatlng.lat(), endlatlng.lng()],
                                    travelMode: 'driving',
                                    strokeColor: '#131540',
                                    strokeOpacity: 0.6,
                                    strokeWeight: 6
                                });

                                var lat2 = endlatlng.lat();
                                var lon2 = endlatlng.lng();
                                var lat1 = startlatlng.lat();
                                var lon1 = startlatlng.lng();

                                var R = 6371; // km 
                                //has a problem with the .toRad() method below.
                                var x1 = lat2 - lat1;
                                var dLat = deg2rad(x1);
                                var x2 = lon2 - lon1;
                                var dLon = deg2rad(x2);
                                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                                var d = R * c;
                                george(d);
                            };
                        }
                    });
                };
            }
        });
    }
