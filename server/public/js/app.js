var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(['$routeProvider', function ($routeProvider) {
    console.log('myApp loaded');
    $routeProvider
        .when('/', {
            redirectTo: '/heatmap'
          })
        .when('/heatmap', {
            templateUrl: '/views/templates/heatmap.html',
            activetab: 'heatmap'
          })
          .when('/circles', {
            templateUrl: '/views/templates/circles.html',
            activetab: 'circles'
          })
        .otherwise({ redirectTo: '<h1>404</h1>' });       
}])