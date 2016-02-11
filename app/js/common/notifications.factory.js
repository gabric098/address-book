(function () {
    'use strict';
    module.exports = function notificationsFactory($mdToast) {

        function showToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position('top right')
                    .hideDelay(2000)
            );
        }

        return {
            showToast: showToast
        }
    };
})();