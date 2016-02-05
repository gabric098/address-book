module.exports = angular
    .module('app.common', [])
    .factory('LocalStorageAdapter', require('./localstorage.factory'))
    .factory('ModelList', require('./modellist.factory'));