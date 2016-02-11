(function () {
    'use strict';
    module.exports = angular
        .module('app.common', [])
        .factory('LocalStorageAdapter', require('./localstorage.factory'))
        .factory('NotificationsService', require('./notifications.factory'))
        .factory('LayoutManager', require('./layoutManager.factory'))
        .directive('countriesSelect', require('./countriesSelect.directive'));
})();