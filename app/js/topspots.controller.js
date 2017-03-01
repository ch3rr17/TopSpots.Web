(function() {
    'use strict';

    angular
        .module('app')
        .controller('TopSpotsController', TopSpotsController);

    TopSpotsController.$inject = ['TopSpotsFactory', 'toastr'];

    /* @ngInject */
    function TopSpotsController(TopSpotsFactory, toastr) {
        var vm = this;
        vm.title = 'TopSpotsController';

        vm.showAddForm = false;
        ////////////////

        getTopSpots();
        function getTopSpots() {
            TopSpotsFactory.grabTopSpots()
                .then(
                    function(response) {
                        vm.topspots = response.data;
                        console.log(response.data);
                    },
                    function(message) {
                        toastr.error(message);
                    }
                );
        }

        vm.addTopSpot = function(newTopSpot){
            vm.topspot.location = [Number(vm.topspot.latitude),Number(vm.topspot.longitude)];
            TopSpotsFactory.newTopSpot(newTopSpot)
            .then(
                function(response){
                    vm.topspots.push(response.data);
                    console.log(response.data);
                    toastr.success('Added a new top spot!');
                },
                function(message){
                    toastr.error(message);
                });

        }

      vm.updateTopSpot = function(topspot,id){
        TopSpotsFactory.updateSpot(topspot,id)
                      .then(
                        function(response){
                        },
                        function(error){
                          toastr.warning("can't update");
                        }
                      );
      }

        vm.deleteTopSpot = function(index){
          // console.log(spots);
          TopSpotsFactory.delTopSpot(index)
                        .then(
                          function(response){
                            vm.topspots.splice(index,1);
                            console.log('you deleted a topspot', vm.topspots);
                          },
                          function(error){
                            //toastr.error(error);
                          }
                        );
        }

    }
})();
