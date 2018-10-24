myApp.service('MainService', ['$http', function($http){
   console.log('MainService loaded');
   const self = this;
   self.map = {};
   self.styles = {};
   self.data = {};
    self.getJSON = function() {
        return $http.get('transactions-by-city.json')
        .then((res)=> {
            self.data  = JSON.stringify(res.data);
            return 'Okay';
        })
        .catch((res)=> {
            console.log('error', res);
        });
    }
    self.getStyles = function() {
        return $http.get('styles.json')
        .then((res)=> {
            self.styles  = JSON.stringify(res.data);
            return 'Groovy';
        })
        .catch((res)=> {
            console.log('error', res);
        });
    }
    self.getMap = function() {
        return $http.get('/api/googlemaps')
            .then((res)=>{
                self.map = res.data;
                return 'Alright';
                
            })
            .catch((err)=>{
                console.log(err);
            })  
        }
}]);
