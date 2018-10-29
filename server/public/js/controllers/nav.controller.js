myApp.controller('NavController', ['$scope', '$location', '$route', function($scope, $location, $route) {
    console.log('NavController loaded');
    const self = this;
    self.isActive = function() {
        console.log('this is location:', $location.path());
        return $location.path();
    }
  }]);

  