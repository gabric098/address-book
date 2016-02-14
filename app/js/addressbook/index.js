/**
 * app.addressbook module definition
 * Adds a common error handler for route changing errors (error resolving promises during route loading)
 */
(function () {
    module.exports = angular
        .module('app.addressbook', [
            'ui.router'
        ])
        .controller('AddressbookController', require('./addressbook.controller'))
        .config(require('./addressbook.config'))
        .run(function ($state, $rootScope, Notifications) {
            "ngInject";
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                event.preventDefault();
                var message = "Oops, something went wrong.";
                if (error.message) {
                    message = error.message;
                }
                Notifications.showToast(error.message);
                $state.go('addressbook.list');
            });
        });
})();