(function () {
    'use strict';

    module.exports = function AddressbookController($scope, $state, $rootScope, $mdSidenav, ContactsManager, Notifications, contactsPrepService) {
        "ngInject";

        var vm = this;

        var lstHandlers = [];

        vm.viewContact = viewContact;
        vm.refreshContacts = refreshContacts;
        vm.showContactsList = showContactsList;
        vm.contacts = [];
        vm.showList = true;

        activate();

        function activate() {
            vm.contacts = contactsPrepService;
            addEventListeners();
        }

        function addEventListeners() {
            lstHandlers.push($rootScope.$on('contactUpdated', vm.refreshContacts));
            lstHandlers.push($rootScope.$on('contactDeleted', vm.refreshContacts));
            $scope.$on('$destroy', unbindListeners);
        }

        function refreshContacts() {
            ContactsManager.getAllContacts().then(onContactsLoad, onContactsLoadError);
        }

        function viewContact(id) {
            $mdSidenav('left').close();
            $state.go('addressbook.view', {id: id});
        }

        function showContactsList() {
            $mdSidenav('left').open();
        }

        function onContactsLoad(contacts) {
            vm.contacts = contacts;
        }

        function onContactsLoadError(contacts) {
            vm.contacts = contacts;
            Notifications.showToast('There was an error loading the contacts.');
        }

        function unbindListeners() {
            lstHandlers.forEach(function (lstHandler) {
                lstHandler();
            });
        }
    };
})();