/**
 * app.common module definition
 */
(function () {
    'use strict';

    module.exports = angular
        .module('app.common', [])
        .factory('LocalStorageAdapter', require('./localstorage.factory'))
        .factory('Notifications', require('./notifications.factory'))
        .directive('countriesSelect', require('./countriesSelect.directive'));
})();