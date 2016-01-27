var app = angular.module('website', [])
    .factory('instagram', ['$http', function ($http){
        return {
            getSelfFeed: function(callback) { 
                var url = function (max_id) {
                    var access_token = "51213996.baa4240.d7e89f9c1fac405e94f9cd2347cb468b";
                    return 'https://api.instagram.com/v1/users/self/media/recent/?access_token='+ access_token + '&callback=JSON_CALLBACK';
                };
                $http.jsonp(url())
                    .success( function(response) {
                        callback(response.data);
                    });
            }
        }
    }])
    .controller('IGDisplayController', function IGDisplayController($scope, instagram) {

        $scope.pictures = [];
        
        function getPictures() {
            instagram.getSelfFeed(function(data) {
                $scope.pictures = $scope.pictures.concat(data);
            });
        }
        
        function activate(){ 
            getPictures();
        }
        
        activate();
 });
