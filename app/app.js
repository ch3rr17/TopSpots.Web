(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'toastr',
            'xeditable'
        ])

    .config(['$stateProvider', '$urlRouterProvider',  function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('topspots');

        $stateProvider.state('topspots', {
            url: '/topspots',
            templateUrl: 'app/templates/topspots.html',
            controller: 'TopSpotsController as vm'
        })

    }])

    .run(function(editableOptions) {
        editableOptions.theme = 'bs3';
      })

    .value('apiUrl', 'http://localhost:51268/api/');

})();
