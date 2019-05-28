var map, popup, Popup;
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
    var center = {
        lat: 39.05458,
        lng: -94.58992
    }
    // The map, centered at westport alehouse
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 15.5,
            center: center
        });

    var homecircleblk = "icons/home-circle.png";
    var placeofworship = "icons/place-of-worship.svg";
    var alehouse = "icons/alehouse-logo.png";

    // The marker, positioned at the Mardid Theater
    var venuemarker = new google.maps.Marker({
        icon: placeofworship,
        position: madrid,
        map: map,
        title: "Madrid Theater"
    });
    var hotel816marker = new google.maps.Marker({
        icon: homecircleblk,
        position: hotel816,
        map: map,
        title: "816 Hotel"
    });
    var hotelacmarker = new google.maps.Marker({
        position: hotelac,
        map: map,
        title: "AC Hotels by Marriott",
        icon: homecircleblk
    });
    var hotelbwmarker = new google.maps.Marker({
        position: hotelbw,
        map: map,
        title: "Best Western",
        icon: homecircleblk
    });
    var westportalemarker = new google.maps.Marker({
        position: westportale,
        map: map,
        title: "Westport Alehouse",
        icon: alehouse
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

    Popup = createPopupClass();
    madridpopup = new Popup(
        new google.maps.LatLng(39.05909, -94.58616),
        document.getElementById('madrid-content'));
    madridpopup.setMap(map);

    popup816 = new Popup(
        new google.maps.LatLng(39.05195, -94.59572),
        document.getElementById('816-content'));
    popup816.setMap(map);

    acpopup = new Popup(
        new google.maps.LatLng(39.05310, -94.59356),
        document.getElementById('ac-content'));
    acpopup.setMap(map);

    bwpopup = new Popup(
        new google.maps.LatLng(39.04955, -94.58612),
        document.getElementById('bestwestern-content'));
    bwpopup.setMap(map);

    alehousepopup = new Popup(
        new google.maps.LatLng(39.05330, -94.58990),
        document.getElementById('alehouse-content'));
    alehousepopup.setMap(map);
}

/**
 * Returns the Popup class.
 *
 * Unfortunately, the Popup class can only be defined after
 * google.maps.OverlayView is defined, when the Maps API is loaded.
 * This function should be called by initMap.
 */
function createPopupClass() {
    /**
     * A customized popup on the map.
     * @param {!google.maps.LatLng} position
     * @param {!Element} content The bubble div.
     * @constructor
     * @extends {google.maps.OverlayView}
     */
    function Popup(position, content) {
        this.position = position;

        content.classList.add('popup-bubble');

        // This zero-height div is positioned at the bottom of the bubble.
        var bubbleAnchor = document.createElement('div');
        bubbleAnchor.classList.add('popup-bubble-anchor');
        bubbleAnchor.appendChild(content);

        // This zero-height div is positioned at the bottom of the tip.
        this.containerDiv = document.createElement('div');
        this.containerDiv.classList.add('popup-container');
        this.containerDiv.appendChild(bubbleAnchor);

        // Optionally stop clicks, etc., from bubbling up to the map.
        google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
    }
    // ES5 magic to extend google.maps.OverlayView.
    Popup.prototype = Object.create(google.maps.OverlayView.prototype);

    /** Called when the popup is added to the map. */
    Popup.prototype.onAdd = function () {
        this.getPanes().floatPane.appendChild(this.containerDiv);
    };

    /** Called when the popup is removed from the map. */
    Popup.prototype.onRemove = function () {
        if (this.containerDiv.parentElement) {
            this.containerDiv.parentElement.removeChild(this.containerDiv);
        }
    };

    /** Called each frame when the popup needs to draw itself. */
    Popup.prototype.draw = function () {
        var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

        // Hide the popup when it is far out of view.
        var display =
            Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
            'block' :
            'none';

        if (display === 'block') {
            this.containerDiv.style.left = divPosition.x + 'px';
            this.containerDiv.style.top = divPosition.y + 'px';
        }
        if (this.containerDiv.style.display !== display) {
            this.containerDiv.style.display = display;
        }
    };

    return Popup;
}
