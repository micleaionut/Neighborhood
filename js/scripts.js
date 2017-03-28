var map;
var myMarkers = [];
var markers;
var info;
var clientID = "RGGDNIGMKBHEIYLVZ02LI0KIH2Z4OV1LTEXW1GSSKCPEDWBP";
var clientSecret = "GX20DWSTEIBFRFQKCHFQ5HDU3AA2DOMRJ3CJ3NINC5UXCHY4";
initMap = () = > {
    mapOptions = {
        center: new google.maps.LatLng(55.676097, 12.568337),
        zoom: 14
    };
    var mapContainer = document.getElementsByClassName("map-container");
    map = new google.maps.Map(mapContainer[0], mapOptions);

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
        }];

    var myMarkers = new markers(model);
    google.maps.event.addListenerOnce(map, 'idle', function () {
        ko.applyBindings(myMarkers);
        google.maps.event.addDomListener(window, "load", myMarkers.initialize);
    });


}
;
markers = function (mark) {
    var self = this;
    info = new google.maps.InfoWindow();
    self.searchReq = ko.observable("");
    self.filter = ko.computed(function () {
        for (var len = mark.length, i = 0; i < mark.length; i++) {
            mark[i].marker.setMap(null);
        }
        var arrayMarkers = [];
        arrayMarkers = $.grep(mark, function (a) {
            var title = a.title.toLowerCase().indexOf(self.searchReq().toLowerCase());
            return (title > -1);
        });
        for (var len = arrayMarkers.length, i = 0; i < arrayMarkers.length; i++)
            !function () {
                var current = i;
                arrayMarkers[current].marker.setMap(map);
            }();
        return arrayMarkers;
    });
    self.setPosition = function (position) {
        var geocod = new google.maps.Geocoder();
        geocod.geocode({
            address: position.address
        }, function (result) {
            position.marker.position = result[0].geometry.location, position.marker.setAnimation(google.maps.Animation.DROP);
        });
    };
    self.setDescription = function (index) {
        google.maps.event.addListener(mark[index].marker, "click", function () {
            var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll=55.676097,12.568337' + '&query=' + mark[index].title + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20160118' + '&query=' + mark[index].title;

            $.getJSON(foursquareURL).done(function (data) {
                var results = data.response.venues[0];
                if (typeof results.location.formattedAddress[0] === 'undefined') {
                    results.location.formattedAddress[0] = "";
                }
                if (typeof results.location.formattedAddress[1] === 'undefined') {
                    results.location.formattedAddress[1] = "";
                }
                info.setContent("<div class='text-primary'><strong>" + mark[index].title + "</strong><br><br> <div style='margin-top:10px;'><i>Descripton</i></div>" + results.location.formattedAddress[0] + " <b> " + results.location.formattedAddress[1] + "</b>" + "</div><br><a href='" + mark[index].web + "'>" + mark[index].web + "</a>");
                info.open(map, mark[index].marker);
            }).fail(function () {
                alert("There was an error with the Foursquare API call. Please refresh the page and try again to load Foursquare data.");
            });

            mark[index].marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                mark[index].marker.setAnimation(null);
            }, 700);
        });
    };
    self.initialize = function () {
        for (var current in mark) {

            self.setPosition(mark[current]);
            self.setDescription(current);
        }
    };
};
toggle = function (current) {
    current.marker.setAnimation(google.maps.Animation.BOUNCE);
    var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll=55.676097,12.568337' + '&query=' + current.title + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20160118' + '&query=' + current.title;

    $.getJSON(foursquareURL).done(function (data) {
        var results = data.response.venues[0];
        if (typeof results.location.formattedAddress[0] === 'undefined') {
            results.location.formattedAddress[0] = "";
        }
        if (typeof results.location.formattedAddress[1] === 'undefined') {
            results.location.formattedAddress[1] = "";
        }
        info.setContent("<div class='text-primary'><strong>" + current.title + "</strong><br><br> <div style='margin-top:10px;'><i>Descripton</i></div>" + results.location.formattedAddress[0] + " <b> " + results.location.formattedAddress[1] + "</b>" + "</div><br><a href='" + current.web + "'>" + current.web + "</a>");
        info.open(map, current.marker);
    }).fail(function () {
        alert("There was an error with the Foursquare API call. Please refresh the page and try again to load Foursquare data.");
    });
    setTimeout(function () {
        current.marker.setAnimation(null);
    }, 700);
};



