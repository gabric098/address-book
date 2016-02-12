(function () {
    'use strict';
    module.exports = angular
        .module('app.common', [])
        .factory('LocalStorageAdapter', require('./localstorage.factory'))
        .factory('Notifications', require('./notifications.factory'))
        .factory('LayoutManager', require('./layoutManager.factory'))
        .directive('countriesSelect', require('./countriesSelect.directive'));
})();