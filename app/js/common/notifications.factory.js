/**
 * A service which abstracts the operation of sending notifications to the user.
 * It uses $mdToast angular material's directive
 */
(function () {
    'use strict';

    module.exports = function notificationsFactory($mdToast) {
        "ngInject";

        var service = {
            showToast: showToast
        };
        return service;

        /**
         * It displays a toast with the specified message for 2 seconds
         * @param message
         */
        function showToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position('top right')
                    .hideDelay(2000)
            );
        }
    };
})();