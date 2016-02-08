module.exports = angular
    .module('app.common', [])
    .factory('LocalStorageAdapter', require('./localstorage.factory'))
    .directive('countriesSelect', require('./countriesSelect.directive'));