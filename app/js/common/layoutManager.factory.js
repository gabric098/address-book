(function () {
    'use strict';
    module.exports = function layoutManager($rootScope, $mdMedia) {
        "ngInject";

        var isPanelOpen = true;

        var service = {
            toggleList: toggleList,
            isListPanelOpen: isListPanelOpen
        };
        return service;

        function isListPanelOpen() {
            return isPanelOpen;
        }

        /**
         * This function is responsible of hiding/showing the
         * contacts list panel (only x-small devices)
         * @param visible
         */
        function toggleList(visible) {
            if ($mdMedia('xs')) {
                isPanelOpen = visible;
            }
        }
    };
})();