module.exports = angular
    .module('app.common', [])
    .factory('LocalStorageAdapter', require('./localstorage.factory'));