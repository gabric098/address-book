(function () {
    'use strict';

    module.exports = function AddressbookController($scope, $state, $rootScope, $mdSidenav, ContactsManager, LayoutManager, Notifications) {
        "ngInject";

        var vm = this;

        var lstHandlers = [];

        vm.viewContact = viewContact;
        vm.refreshContacts = refreshContacts;
        vm.isListPanelOpen = isListPanelOpen;
        vm.back = back;

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
            ContactsManager.getAllContacts().then(onContactsLoad, onContactsLoadError);
        }

        function viewContact(id) {
            $state.go('addressbook.view', {id: id});
        }

        function unbindListeners() {
            lstHandlers.forEach(function (lstHandler) {
                lstHandler();
            });
        }

        function isListPanelOpen() {
            return LayoutManager.isListPanelOpen();
        }

        function back() {
            LayoutManager.toggleList(true);
        }

        function onContactsLoad(contacts) {
            console.log('onContactsLoad');
            vm.contacts = contacts;
        }

        function onContactsLoadError(contacts) {
            vm.contacts = contacts;
            Notifications.showToast('There was an error loading the contacts.');
        }
    };
})();