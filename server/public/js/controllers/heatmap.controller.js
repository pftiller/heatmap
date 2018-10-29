myApp.controller('HeatmapController', ['MainService', '$window', function(MainService, $window) {
  console.log('HeatmapController loaded');
  const self = this;
  self.map = {};
  function widgetsController($scope, $route) {
    $scope.$route = $route;
}
  self.heatmap;
  self.data = {};
  let heatMapData = [];
  function init() {
    MainService.getHeatmap().then((response) => {
        self.heatmap = MainService.heatmap;
        console.log('got heatmap');
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
          zoom: 6.5,
          disableDefaultUI: true,
          gestureHandling: 'none',
          zoomControl: false,
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
      var map = new google.maps.Map(document.getElementById("heatmap"), mapOptions);

      for(let i = 0; i<self.heatmap.length; i++ ) {
          let heatmapPoint = {location: new google.maps.LatLng(self.heatmap[i].lat, self.heatmap[i].lng), weight: self.heatmap[i].weight};
          heatMapData.push(heatmapPoint);
      }
     var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData,
        dissipating: true,
        map: map,
        radius: 1000000
      });

    heatmap.set('gradient', heatmap.get('gradient'));
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
  
      heatmap.setMap(map);
  }
  var loadMap = new Promise(function(resolve, reject) {
    setTimeout(function() {
        var js_file = document.createElement('script');
        js_file.type = 'text/javascript';
        js_file.defer = true;
        js_file.src = `https://maps.googleapis.com/maps/api/js?key=${self.map.key}&libraries=visualization&callback=initMap`
        document.getElementsByTagName('body')[0].appendChild(js_file);
        resolve('All done');
    }, 300);
});
  init()

}]);