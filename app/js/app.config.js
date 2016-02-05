module.exports = function appConfig($locationProvider, $stateProvider, $urlRouterProvider) {
    "ngInject";

    // HTML5 settings
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    // For any unmatched url, redirect to index
    $urlRouterProvider.otherwise("/");

    // // Setup default state/path/template
    $stateProvider.state('index', {
        url: '/',
        templateUrl: 'js/main/views/index.html',
        controller: 'AppController',
        controllerAs: 'app'
    });
};
