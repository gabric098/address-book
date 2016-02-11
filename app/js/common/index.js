(function () {
    'use strict';
    module.exports = angular
        .module('app.common', [])
        .factory('LocalStorageAdapter', require('./localstorage.factory'))
        .factory('NotificationsService', require('./notifications.factory'))
        .directive('countriesSelect', require('./countriesSelect.directive'));
})();