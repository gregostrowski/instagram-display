var app = angular.module('website', [])
    .factory('instagram', ['$http', function ($http){
        var url = function (max_id) {
            var access_token = "51213996.baa4240.d7e89f9c1fac405e94f9cd2347cb468b";
            return 'https://api.instagram.com/v1/users/self/media/recent/?' + (max_id ? ('max_id='+max_id + '&') : '') + 'access_token='+ access_token + '&callback=JSON_CALLBACK&count=33';
        };
        return {
            getSelfFeed: function(callback, max_id) {                 
                $http.jsonp(url(max_id))
                    .success(function(response) {
                        callback(response);
                    });
            }
        }
    }])
    .controller('IGDisplayController', function IGDisplayController($scope, instagram, $window) {
        $scope.width;
        $scope.rows = 2;
        $scope.defaultImgWidth = 200;
        $scope.imgDimensions = 0;
        $scope.containerWidth = 0; //pictures.length * imgWidth
        $scope.pictures = [];

        function getPictures(max_id) {
            instagram.getSelfFeed(getPicturesSuccessful, max_id);
        }
        
        function getPicturesSuccessful(response) {
            $scope.pictures = $scope.pictures.concat(response.data);
            if(response.pagination){
                $scope.pagination = response.pagination;
            }
        }
        
        $scope.$watch('pictures.length', calculateDimensions);
        
        angular.element($window).bind('resize', calculateDimensions);
        
        function calculateDimensions() {
            $scope.width = $window.innerWidth;
            if($scope.width < 1000) { 
                $scope.rows = 4;
            } else {
                $scope.rows = 2;
            }
            $scope.imgDimensions = $scope.width / ($scope.pictures.length / $scope.rows);
            if(!$scope.$$phase) {
                $scope.$digest();
            }
        }
        
        function activate(){ 
            getPictures();
        }
        
        activate();
 });
