myApp.service('MainService', ['$http', function($http){
   console.log('MainService loaded');
   const self = this;
   self.data = {};

    self.getMap = function() {
        return $http.get('/api/googlemaps')
            .then((res)=>{
                self.data = res.data;
                return 'Alright';
                
            })
            .catch((err)=>{
                console.log(err);
            })  
        }
}]);


