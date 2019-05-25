// Initialize and add the map
function initMap() {
    // The location of Madrid Theater 39.05809, -94.58616
    var madrid = {
        lat: 39.05809,
        lng: -94.58616
    };
    // 39.05125, -94.59572
    var hotel816 = {
        lat: 39.05125,
        lng: -94.59572
    };
    // 39.05243, -94.59356
    var hotelac = {
        lat: 39.05243,
        lng: -94.59356
    };
    // 39.0489, -94.58612
    var hotelbw = {
        lat: 39.0489,
        lng: -94.58612
    };
    // 39.05248, -94.59002
    var westportale = {
        lat: 39.05248,
        lng: -94.59002
    };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 15.25,
            center: westportale
        });
    // The marker, positioned at the Mardid Theater
    var venuemarker = new google.maps.Marker({
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7
        },
        position: madrid,
        map: map,
        title: "Madrid Theater"
    });
    var hotel816marker = new google.maps.Marker({
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            strokeOpacity: 0,
            fillColor: "#4d90fe",
            fillOpacity: 1,
            scale: 4
        },
        position: hotel816,
        map: map,
        title: "816 Hotel"
    });
    var hotelacmarker = new google.maps.Marker({
        position: hotelac,
        map: map,
        title: "AC Hotels by Marriott"
    });
    var hotelbwmarker = new google.maps.Marker({
        position: hotelbw,
        map: map,
        title: "Best Western"
    });
    var westportalemarker = new google.maps.Marker({
        position: westportale,
        map: map,
        title: "Westport Alehouse"
    });

    var styles = {
        default: null,
        hide: [{
            featureType: 'poi',
            stylers: [{
                visibility: 'off'
      }]
    }]
    };
    map.setOptions({
        styles: styles['hide']
    });
}
