(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'toastr'
        ])

    .config(['$stateProvider', '$urlRouterProvider',  function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('topspots');

        $stateProvider.state('topspots', {
            url: '/topspots',
            templateUrl: 'app/templates/topspots.html',
            controller: 'TopSpotsController as vm'
        })

    }])

    .value('apiUrl', 'http://localhost:51268/api/');

})();
