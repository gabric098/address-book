(function () {
    'use strict';
    module.exports = function notificationsFactory($mdToast) {

        var service = {
            showToast: showToast
        };
        return service;

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