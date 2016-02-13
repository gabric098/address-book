(function () {
    'use strict';
    module.exports = function ContactEditorController($state, $rootScope, $mdDialog, $mdMedia, $mdSidenav, ContactsManager, Notifications, options, contactPrepService) {
        "ngInject";

        var vm = this;

        vm.contact = {};
        vm.title = '';
        vm.mode = '';
        vm.submitForm = submitForm;
        vm.deleteContact = deleteContact;
        vm.confirmDelete = confirmDelete;
        vm.showContactsList = showContactsList;

        activate();

        function activate() {
            $mdSidenav('left').close();
            if (options.mode == 'view' && angular.equals({}, contactPrepService)) {
                Notifications.showToast('Contact not found');
                $state.go('addressbook.list');
            }
            vm.contact = contactPrepService;
            vm.title = options.title;
            vm.mode = options.mode;
        }

        function submitForm() {
            ContactsManager.saveContact(vm.contact).then(onSaveContact, onSaveContentError);
        }

        function deleteContact() {
            ContactsManager.removeContact(vm.contact.id).then(onDeleteContact, onDeleteContactError);
        }

        function showContactsList() {
            $mdSidenav('left').open();
        }

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

        function onSaveContentError() {
            Notifications.showToast('Error saving contact');
        }

        function onDeleteContact() {
            Notifications.showToast('Contact deleted');
            $rootScope.$broadcast('contactDeleted');
            showContactsList();
            $state.go('addressbook.list');
        }

        function onDeleteContactError() {
            Notifications.showToast('Error deleting contact');
        }
    };
})();