module.exports = function appConfig($locationProvider, $urlRouterProvider) {
    "ngInject";

    // HTML5 settings
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    // For any unmatched url, redirect to index
    $urlRouterProvider.otherwise("/addressbook");
};
