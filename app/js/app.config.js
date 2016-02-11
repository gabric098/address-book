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
