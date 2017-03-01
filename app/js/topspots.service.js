(function() {
    'use strict';

    angular
        .module('app')
        .factory('TopSpotsFactory', TopSpotsFactory);

    TopSpotsFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function TopSpotsFactory($http, $q, toastr, apiUrl) {
        var service = {
            grabTopSpots: grabTopSpots,
            newTopSpot: newTopSpot,
            updateSpot: updateSpot,
            delTopSpot: delTopSpot
        };
        return service;

        ////////////////

//GRAB TOP SPOTS
        function grabTopSpots() {
            var defer = $q.defer();

            $http.get(apiUrl + 'topspots')
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log(response);
                        toastr.success('We have top spots!');
                    },
                    function(err) {
                        defer.reject(err.data.message);
                    }
                );

            return defer.promise
        }

//ADD NEW TOPSPOT
        function newTopSpot(topspot) {
            var defer = $q.defer();

            $http.post(apiUrl + 'topspots', topspot)
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log(response);
                    },
                    function(err) {
                        defer.reject(err.data.message);
                    }
                );
            return defer.promise;
        }

//UPDATE TOPSPOT
        function updateSpot(topspot,id){
          var defer = $q.defer();
          var url = apiUrl + 'topspots' + '/' + id;
          console.log(topspot);
          $http({
            method: 'PUT',
            url: url,
            data: topspot
          })
          .then(
            function(response){
              defer.resolve(response);
              console.log(response);
              toastr.success("UPDATED TOPSPOT");
            },
            function(error){
              toastr.error('error: ' + error.data + '<br/>status: ' + error.statusText);
            }
          );

          return defer.promise;
        }

//DELETE TOPSPOT
        function delTopSpot(id){
          var defer = $q.defer();
          var url = apiUrl + 'topspots' + '/' + id;
          console.log(url);
          $http({
            method: 'DELETE',
            url: url
          })
          .then(
            function(response){
              defer.resolve(response);
              console.log('deleted', response);
              toastr.success('YOU HAVE DELETED A TOPSPOT');
            },
            function(error){
              defer.reject(error);
              console.log(error);
              toastr.error('error: ' + error.data + '<br/>status: ' + error.statusText);
            }
          );

          return defer.promise;
        }
    }
})();
