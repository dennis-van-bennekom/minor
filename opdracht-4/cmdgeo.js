(function() {
    'use strict';

    var constants = {
        SANDBOX: 'SANDBOX',
        LINEAIR: 'LINEAIR',
        GPS_AVAILABLE: 'GPS_AVAILABLE',
        GPS_UNAVAILABLE: 'GPS_UNAVAILABLE',
        POSITION_UPDATED: 'POSITION_UPDATED',
        REFRESH_RATE: 1000
    };

    function Maps() {
        this.currentPosition = false;
        this.currentPositionMarker = false;
        this.customDebugging = false;
        this.debugId = 0;
        this.map = false;
        this.interval = false;
        this.intervalCounter = false;
        this.updateMap = false;
        this.locationRow = [];
        this.markerRow = [];
    }

    Maps.prototype.init = function() {
        ET.addListener(constants.GPS_AVAILABLE, startInterval);
        ET.addListener(constants.GPS_UNAVAILABLE, function() {
            console.log('GPS is unavailable');
        });
    }

    /**
     * Start interval
     */
    Maps.prototype.startInterval = function() {
        this.updatePosition();
        this.interval = setInterval(this.updatePosition, constants.REFRESH_RATE);
        ET.addListener(constants.POSITION_UPDATED, this.checkLocations);
    }

    /**
     * Set current position
     */
    Maps.prototype.setPosition = function(position) {
        this.currentPosition = position;
        ET.fire(constants.POSITION_UPDATED);
    }

    /**
     * Check the locations navigate the user to the correct page
     */
    Maps.prototype.checkLocations = function(event) {
        this.location.forEach(function(currentLocation) {
            var location = {
                coords: {
                    latitude: this.currentLocation[3],
                    longitude: this.currentLocation[4]
                }
            };

            if(calculateDistsance(location, currentPosition) < this.currentLocation[2]) {
                if (window.location !== this.currentLocation[1] &&
                    localStorage[this.currentLocation[0]] == 'false') {
                    try {
                        localStorage[this.currentLocation[0]] == 'false' ?
                            localStorage[this.currentLocation[0]] = 1:
                            localStorage[this.currentLocation[0]] += 1;
                    } catch(error) {
                        console.log('Localstorage is not available');
                    }

                    window.location = this.currentLocation[1];
                }
            }
        });
    }

    /**
     * Calculate distance between two positions
     */
    Maps.prototype.calculateDistance = function(p1, p2) {
        p1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
        p2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
        return Math.round(google.maps.geometry.spherical.computeDistanceBetween(p1, p2));
    }

    Maps.prototype.generateMap = function(options, canvasID) {
            map = new google.maps.Map(document.getElementById(canvasID), options);

            var routeList = [];

            for (var i = 0; i < locaties.length; i++) {

                // Met kudos aan Tomas Harkema, probeer local storage, als het bestaat, voeg de locaties toe
                try {
                    (localStorage.visited==undefined||this.isNumber(localStorage.visited))?localStorage[locaties[i][0]]=false:null;
                } catch (error) {
                    console.log("Localstorage kan niet aangesproken worden: " + error);
                }

                var markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
                this.routeList.push(markerLatLng);

                this.MarkerRow[i] = {};

                for (var attr in this.locationMarker) {
                    this.markerRow[i][attr] = this.locationMarker[attr];
                }

                this.markerRow[i].scale = locaties[i][2]/3;

                var marker = new google.maps.Marker({
                    position: markerLatLng,
                    map: map,
                    icon: markerRij[i],
                    title: locaties[i][0]
                });
            }

            if (tourType == LINEAIR){
                var route = new google.maps.Polyline({
                    clickable: false,
                    map: map,
                    path: routeList,
                    strokeColor: 'Black',
                    strokeOpacity: .6,
                    strokeWeight: 3
                });
            }

            // Voeg de locatie van de persoon door
            this.currentPositionMarker = new google.maps.Marker({
                position: kaartOpties.center,
                map: map,
                icon: positieMarker,
                title: 'U bevindt zich hier'
            });

            // Zorg dat de kaart geupdated wordt als het POSITION_UPDATED event afgevuurd wordt
            ET.addListener(POSITION_UPDATED, update_positie);
    }

    Maps.prototype.isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    Maps.prototype.updatePosition = function(event) {
        var newPos = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
        this.map.setCenter(newPos);
        this.currentPositionMarker.setPosition(newPos);
    }

    var maps = new Maps();

    maps.init();
})();