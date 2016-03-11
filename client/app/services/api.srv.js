(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('ApiSrv',ApiSrv);

    ApiSrv.$inject = ['$http'];
    
    function ApiSrv($http){     
         var BASEURL = "https://www.reddit.com/r/";
       
        /////////////////////////////////
        function getRequest(sub,filter,limit) {
            return $http.get(BASEURL+sub+'/'+filter+''+'/.json?limit='+limit)
                .then(getComplete)
                .catch(getFail);
                
                function getComplete(data, status, headers, config) {
                        return data; 
                }
                
                function getFail(e) {
                    return e;
                }
        }
        
         var service = {
            getRequest : getRequest
        }
        return service;
                
        
    }

})();