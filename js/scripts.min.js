"use strict";
var model = [{
        title: "Tivoli",
        web: "http://www.tivoli.dk",
        address: "Vesterbrogade 3 1630 København V",
        description: "Tivoli Gardens amusement park in central Copenhagen<br> offers rides, games, musicals, ballet, and major concerts",
        marker: new google.maps.Marker({
            position: new google.maps.LatLng(0, 0)
        })
    }, {
        title: "Scandic Copenhagen",
        web: "http://scandichotels.dk",
        address: "Vester Søgade 6, 1601 København V",
        description: "Stay centrally in a hotel with impressive views of the Lakes and Copenhagen skyline. An exceptional conference hotel – also with an underground car park.",
        marker: new google.maps.Marker({
            position: new google.maps.LatLng(0, 0)
        })
    }, {
        title: "Hotel SP 34",
        web: "http://brochner-hotels.dk",
        address: "Sankt Peders Stræde 34, 1453 København K",
        description: "Tag et kig på vores tilbud på Hotel SP34 i København. Finder du hotellet til en lavere pris et andet sted, matcher vi prisen gennem vores prisgaranti.",
        marker: new google.maps.Marker({
            position: new google.maps.LatLng(0, 0)
        })
    }, {
        title: "Akustikken",
        web: "http://akustikken.dk",
        address: "Bagerstræde 7, 1617 København V",
        description: "Handler fortrinsvis med nye og brugte guitarer. Importør af Martin og Amalio Burguet guitarer. Århus.",
        marker: new google.maps.Marker({
            position: new google.maps.LatLng(0, 0)
        })
    }, {
        title: "Forum",
        web: "http://forumcopenhagen.dk",
        address: "Julius Thomsens Pl. 1, 1925 Frederiksberg C",
        description: "Forums arrangementkalender byder i dag på et stort og varieret mix af koncerter, fagmesser og udstillinger med fokus på oplevelser og livsstil.",
        marker: new google.maps.Marker({
            position: new google.maps.LatLng(0, 0)
        })
    }, {
        title: "GL Strand",
        web: "http://glstrand.dk",
        address: "Gammel Strand 48, 1202 København K",
        description: "HOLD DIT ARRANGEMENT I GL STRANDS SMUKKE SAL SliderImage Læs mere. Bestil en omvisning med en kunsthistoriker i vores aktuelle udstillinger ...",
        marker: new google.maps.Marker({
            position: new google.maps.LatLng(0, 0)
        })
    }, {
        title: "Harbour bath",
        web: "http://teambade.dk",
        address: "Islands Brygge 14, 2300 København S",
        description: "The Harbour Bath has been instrumental in this evolution. It extends the adjacent park over the water by incorporating",
        marker: new google.maps.Marker({
            position: new google.maps.LatLng(0, 0)
        })
    }, {
        title: "Christiansborg Slot",
        web: "http://christiansborg.dk",
        address: "Prins Jørgens Gård 1, 1218 København",
        description: "Christiansborg Slot på Slotsholmen i det centrale København er hjemsted for Danmarks parlament, Folketinget, for Højesteret og Statsministeriet.",
        marker: new google.maps.Marker({
            position: new google.maps.LatLng(0, 0)
        })
    }],
    markers = function(a) {
        var b = this;
        b.mapOptions = {
            center: new google.maps.LatLng(55.676097, 12.568337),
            zoom: 14
        };
        var c = document.getElementsByClassName("map-container");
        b.map = new google.maps.Map(c[0], b.mapOptions), b.info = new google.maps.InfoWindow, b.searchReq = ko.observable(""), b.filter = ko.computed(function() {
            for (var c = a.length, d = 0; d < c; d++) a[d].marker.setMap(null);
            var e = [];
            e = $.grep(a, function(a) {
                var c = a.title.toLowerCase().indexOf(b.searchReq().toLowerCase());
                return c > -1
            });
            for (var c = e.length, d = 0; d < c; d++) ! function() {
                var c = d;
                e[c].marker.setMap(b.map)
            }();
            return e
        }), b.setPosition = function(a) {
            var b = new google.maps.Geocoder;
            b.geocode({
                address: a.address
            }, function(b, c) {
                a.marker.position = b[0].geometry.location, a.marker.setAnimation(google.maps.Animation.DROP)
            })
        }, b.setDescription = function(c) {
            google.maps.event.addListener(a[c].marker, "click", function() {
                b.info.setContent("<div class='text-primary'><strong>" + a[c].title + "</strong><br><br> <div style='margin-top:10px;'><i>Descripton</i></div>" + a[c].description + "</div><br><a href='" + a[c].web + "'>" + a[c].web + "</a>"), b.info.open(b.map, a[c].marker)
            })
        }, b.initialize = function() {
            for (var c in a) b.setPosition(a[c]), b.setDescription(c)
        },
		b.toggle = function(a) {
      a.marker.setAnimation(google.maps.Animation.BOUNCE); 
		  }
    },
    myMarkers = new markers(model);
ko.applyBindings(myMarkers), google.maps.event.addDomListener(window, "load", myMarkers.initialize);