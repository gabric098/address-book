(function () {
    'use strict';

    module.exports = function AddressbookController($scope, $state, $rootScope, ContactsManager) {
        "ngInject";

        var vm = this;

        var lstHandlers = [];

        vm.viewContact = viewContact;
        vm.refreshContacts = refreshContacts;

        activate();

        function activate() {
            refreshContacts();
            addEventListeners();
        }

        function addEventListeners() {
            lstHandlers.push($rootScope.$on('contactUpdated', vm.refreshContacts));
            lstHandlers.push($rootScope.$on('contactDeleted', vm.refreshContacts));
            $scope.$on('$destroy', unbindListeners);
        }

        function refreshContacts() {
            vm.contacts = ContactsManager.getAllContacts();
        }

        function viewContact(id) {
            $state.go('addressbook.view', {id: id});
        }

        function unbindListeners() {
            lstHandlers.forEach(function(lstHandler) {
                lstHandler();
            });
        }
    };
})();