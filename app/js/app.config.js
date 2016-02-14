/**
 * app module configuration
 * - forces html5 mode
 * - setup some theme properties
 * - define the default route
 */
(function () {
    'use strict';

    module.exports = function appConfig($locationProvider, $urlRouterProvider, $mdThemingProvider) {
        "ngInject";

        // HTML5 settings
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('blue')
            .warnPalette('red');

        // For any unmatched url, redirect to index
        $urlRouterProvider.otherwise("/addressbook");
    };
})();
