myApp.controller('MainController', ['MainService', '$window', function(MainService, $window) {
    console.log('MainController loaded');
    const self = this;
    self.data = {};
    function init() {
        MainService.getMap().then((response) => {
            console.log(response);
            self.data = MainService.data;
            loadMap.then((response) => {
                console.log(response);
                setTimeout(()=>{initMap(); },1000);
        })
    })
}
let initMap = function() {
    $window.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45, lng: -93.25},
      zoom: 10,
      styles: [
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]
    });
  }
  var loadMap = new Promise(function(resolve, reject) {
    setTimeout(function() {
        var js_file = document.createElement('script');
        js_file.type = 'text/javascript';
        js_file.src = `https://maps.googleapis.com/maps/api/js?key=${self.data.key}`
        document.getElementsByTagName('head')[0].appendChild(js_file);
        resolve('All done');
    }, 300);
  }); 
    init()

}]);
