myApp.service('MainService', ['$http', function($http){
   console.log('MainService loaded');
   const self = this;
   self.map = {};
   self.styles = {};
   self.heatmap;
   self.circles;
    self.getHeatmap = function() {
        return $http.get('heatmap.json')
        .then((res)=> {
            self.heatmap  = res.data;
            return 'Yep';
        })
        .catch((res)=> {
            console.log('error', res);
        });
    }
    self.getJSON = function() {
        return $http.get('circles.json')
        .then((res)=> {
            self.circles  = JSON.stringify(res.data);
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
