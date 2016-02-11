(function () {
    module.exports = angular
        .module('app.addressbook', [
            'ui.router'
        ])
        .controller('AddressbookController', require('./addressbook.controller'))
        .config(require('./addressbook.config'))
})();