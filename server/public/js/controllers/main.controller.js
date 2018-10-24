myApp.controller('MainController', ['MainService', '$window', function(MainService, $window) {
  console.log('MainController loaded');
  const self = this;
  var cityCircle;
  self.map = {};
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  // self.styles;
  self.data = {};

  function init() {
      MainService.getJSON().then((response) => {
          self.data = MainService.data;
          console.log('got data');
          loadMap.then((response) => {
              console.log(response);
              setTimeout(() => {
                  initMap();
              }, 1000);
          })
      });
      // MainService.getStyles().then((response) => {
      //     self.styles = MainService.data;
      //     console.log('got styles');
      // });
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

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var infoWindow = new google.maps.InfoWindow();
      map.data.loadGeoJson('transactions-by-city.json');
      map.data.setStyle(function(feature) {
          var weight = feature.getProperty('weight');
          return {
              icon: getCircle(weight),
          };
      });

      function getCircle(weight) {
          cityCircle = {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: getColor(weight),
              fillOpacity: .75,
              scale: Math.pow(2, weight) / 1.5,
              strokeColor: '#000',
              strokeWeight: 1.5,
              clickable: true,
          };

          return cityCircle
      }
      function getColor(weight) {
        if(weight < 1 && weight > 0) {
          return '#FFCCCC';
        }
        else if(weight < 2 && weight > 1) {
          return '#FF9999';
        }
        else if(weight < 3 && weight > 2) {
          return '#FF6666';
        }
        else if(weight < 4 && weight > 3) {
          return '#FF3333';
        }
        else if(weight < 5 && weight > 4) {
          return '#FF0000';
        }
        else if(weight < 6 && weight > 5) {
          return '#CC0000';
        }
        else if(weight > 6) {
          return '#990000';
        }
        else {
          return '#E8E3E3'
        }

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
      setTimeout(function() {
          var js_file = document.createElement('script');
          js_file.type = 'text/javascript';
          js_file.defer = true;
          js_file.src = `https://maps.googleapis.com/maps/api/js?key=${self.map.key}&callback=initMap`
          document.getElementsByTagName('body')[0].appendChild(js_file);
          resolve('All done');
      }, 300);
  });
  init()

}]);