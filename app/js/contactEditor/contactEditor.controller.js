/**
 * ContactEditor controller.
 * It contains the logic for the edit/view form
 */
(function () {
    'use strict';
    module.exports = function ContactEditorController($state, $rootScope, $mdDialog, $mdMedia, $mdSidenav, ContactsManager, Notifications, options, contactPrepService) {
        "ngInject";

        var vm = this;

        /**
         * The contact object
         * @type {object}
         */
        vm.contact = {};
        /**
         * The title to display in the toolbar
         * @type {string}
         */
        vm.title = '';
        /**
         * Form mode (view|add)
         * @type {string}
         */
        vm.mode = '';
        vm.submitForm = submitForm;
        vm.deleteContact = deleteContact;
        vm.confirmDelete = confirmDelete;
        vm.showContactsList = showContactsList;

        activate();

        /**
         * Controller initialization method.
         * It initialises the controller with router's pre-resolved data.
         */
        function activate() {
            $mdSidenav('left').close();
            handleContactNotFound();
            vm.contact = contactPrepService;
            vm.title = options.title;
            vm.mode = options.mode;
        }

        /**
         * If the user tries to view/edit a non-existent user id,
         * we show an error message and we redirect to the list state
         */
        function handleContactNotFound() {
            if (options.mode == 'view' && angular.equals({}, contactPrepService)) {
                Notifications.showToast('Contact not found');
                $state.go('addressbook.list');
            }
        }

        /**
         * Invoked when the save button is pressed.
         */
        function submitForm() {
            ContactsManager.saveContact(vm.contact).then(onSaveContact, onSaveContentError);
        }

        /**
         * Invoked when the delete button is pressed.
         */
        function deleteContact() {
            ContactsManager.removeContact(vm.contact.id).then(onDeleteContact, onDeleteContactError);
        }

        /**
         * Show the contacts list in the sidebar (only used for mobile)
         */
        function showContactsList() {
            $mdSidenav('left').open();
        }

        /**
         * Shows a confirm dialog when the user tries to delete a contact
         * TODO: move to notifications factory
         */
        function confirmDelete() {
            var confirm = $mdDialog.confirm()
                .title('Do you really want to delete this contact?')
                .textContent('The contact will be permanently deleted.')
                .ariaLabel('Confirm deletion')
                .ok('Yes, delete it')
                .cancel('No, I still need it');
            $mdDialog.show(confirm).then(function () {
                vm.deleteContact();
            });
        }

        /**
         * Handler for the promise.resolve upon saveContact operation.
         * Performs some notifications and UI operation.
         * Redirects to list or view state, depending on the device used.
         * TODO: remove all the UI logic from here
         *
         * @param savedContactId {string} the id of the just saved contact
         */
        function onSaveContact(savedContactId) {
            $rootScope.$broadcast('contactUpdated');
            Notifications.showToast('Contact saved');
            if ($mdMedia('xs')) {
                showContactsList();
                $state.go('addressbook.list');
            } else {
                $state.go('addressbook.view', {"id": savedContactId});
            }
        }

        /**
         * Handler for the promise.reject upon saveContact operation.
         * Displays an error message
         */
        function onSaveContentError() {
            Notifications.showToast('Error saving contact');
        }

        /**
         * Handler for the promise.resolve upon deleteContact operation.
         * Show a notification message, and broadcasts a contactDeleted event
         */
        function onDeleteContact() {
            Notifications.showToast('Contact deleted');
            $rootScope.$broadcast('contactDeleted');
            showContactsList();
            $state.go('addressbook.list');
        }

        /**
         * Handler for the promise.reject upon deleteContact operation.
         * Shows an error message
         */
        function onDeleteContactError() {
            Notifications.showToast('Error deleting contact');
        }
    };
})();