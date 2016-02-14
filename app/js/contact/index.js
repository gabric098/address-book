/**
 * app.contact module definition
 */
(function () {
    'use strict';

    module.exports = angular
        .module('app.contact', [])
        .factory('Contact', require('./contact.factory'))
        .factory('ContactsManager', require('./contactsmanager.factory'));
})();