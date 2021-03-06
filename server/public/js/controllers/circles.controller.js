myApp.controller('CirclesController', ['MainService', '$window', function(MainService, $window) {
    console.log('CirclesController loaded');
    const self = this;
    var cityCircle;
    let body = document.querySelector('body');
    var map;
    self.map = {};
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })
    self.data = MainService.circles;
    function init() {
        MainService.getJSON().then((response) => {
            self.data = MainService.circles;
            console.log('got data');
            loadMap.then((response) => {
                console.log(response);
                setTimeout(() => {
                    initMap();
                }, 1000);
            })
    });
    MainService.getMap().then((response) => {
        console.log('got key');
        self.map = MainService.map;
      
    })
}
    initMap = function() {
        var mapOptions = {
            center: {
                lat: 45,
                lng: -93.25
            },
            zoom: 9,
            disableDefaultUI: true,
            zoomControl: true,
            styles: [{
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative.land_parcel",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative.neighborhood",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.arterial",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [{
                    "visibility": "off"
                }]
            }]
        };
        var map = new google.maps.Map(document.getElementById("circles"), mapOptions);
        var infoWindow = new google.maps.InfoWindow();
        map.data.loadGeoJson(
            'circles.json', {},
        );
        map.data.loadGeoJson('circles.json');
        map.data.setStyle(function(feature) {
            var weight = feature.getProperty('weight');
            return {
                icon: getCircle(weight),
                map: map
            };
        });
        
        function getCircle(weight) {
            cityCircle = {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: 'red',
                fillOpacity: .75,
                scale: weight * 1.5,
                strokeColor: '#000',
                strokeWeight: 1.5,
                clickable: true
            };
  
            return cityCircle
        }
      
        map.data.addListener('mouseover', function(event) {
            var feature = event.feature;
            let name = feature.getProperty('name');
            let transactions = feature.getProperty('transactions');
            let revenue = feature.getProperty('revenue');
            let formattedTransactions = transactions.toLocaleString();
            let formattedRevenue = formatter.format(revenue)
            var html = `<h2 class="center">${name}</h2>`;
            html += `<p><strong>Transactions:</strong>&nbsp;&nbsp;&nbsp;${formattedTransactions}</p>`;
            html += `<p><strong>Revenue:</strong>&nbsp;&nbsp;&nbsp;${formattedRevenue}</p>`;
            infoWindow.setContent(html);
            infoWindow.setPosition(event.latLng);
            infoWindow.setOptions({
                pixelOffset: new google.maps.Size(0, -34)
            });
            infoWindow.open(map);
        });
        map.data.addListener('mouseout', function() {
          infoWindow.close(map);
      });
    }
    var loadMap = new Promise(function(resolve, reject) {
        if (document.getElementsByTagName('body') !== null) {
        setTimeout(function() {
            var js_file = document.createElement('script');
            js_file.type = 'text/javascript';
            js_file.defer = true;
            js_file.src = `https://maps.googleapis.com/maps/api/js?key=${self.map.key}&libraries=visualization&callback=initMap`
            document.getElementsByTagName('body')[0].appendChild(js_file);
            resolve('All done');
        }, 300);
    }
    });
    init()
  
  }]);