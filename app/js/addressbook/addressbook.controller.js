/**
 * Addressbook base controller.
 * It contains the common application logic.
 */
(function () {
    'use strict';

    module.exports = function AddressbookController($scope, $state, $rootScope, $mdSidenav, ContactsManager, Notifications, contactsPrepService) {
        "ngInject";

        var vm = this;

        /**
         * The list of the event listeners unsubscribe functions
         * @type {Array}
         */
        var lstHandlers = [];

        /**
         * The list of contacts to display in the sidenav
         * @type {Array}
         */
        vm.contacts = [];

        /**
         * The status of the sidenav (used only on mobile)
         * @type {Array}
         */
        vm.showList = true;

        vm.viewContact = viewContact;
        vm.refreshContacts = refreshContacts;
        vm.showContactsList = showContactsList;

        activate();

        /**
         * Controller initialization method.
         */
        function activate() {
            vm.contacts = contactsPrepService;
            addEventListeners();
        }

        /**
         * Adds some event listeners.
         * For simplicity I used $rootScope as message bus, it would be better to implement a dedicated
         * pubsub service for this
         */
        function addEventListeners() {
            lstHandlers.push($rootScope.$on('contactUpdated', vm.refreshContacts));
            lstHandlers.push($rootScope.$on('contactDeleted', vm.refreshContacts));
            $scope.$on('$destroy', unbindListeners);
        }

        /**
         * Re-fetches the contact list from.
         */
        function refreshContacts() {
            ContactsManager.getAllContacts().then(onContactsLoad, onContactsLoadError);
        }

        /**
         * Tigger the view route for a specific contact
         * @param id {String} The contact id
         */
        function viewContact(id) {
            $mdSidenav('left').close();
            $state.go('addressbook.view', {id: id});
        }

        /**
         * Show the navbar
         */
        function showContactsList() {
            $mdSidenav('left').open();
        }

        /**
         * Handler for the contacts loading promise.resolve
         * @param contacts
         */
        function onContactsLoad(contacts) {
            vm.contacts = contacts;
        }

        /**
         * Handler for the contacts loading promise.reject
         * @param contacts
         */
        function onContactsLoadError(contacts) {
            vm.contacts = contacts;
            Notifications.showToast('There was an error loading the contacts.');
        }

        /**
         * Unbinds all the event listeners when the scope gets destroyed
         */
        function unbindListeners() {
            lstHandlers.forEach(function (lstHandler) {
                lstHandler();
            });
        }
    };
})();