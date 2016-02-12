(function () {
    'use strict';
    module.exports = function ContactEditorController($state, $rootScope, $stateParams, ContactsManager, $mdDialog, $mdMedia, Notifications, options) {
        "ngInject";

        var vm = this;

        vm.contact = {};
        vm.submitForm = submitForm;
        vm.deleteContact = deleteContact;
        vm.confirmDelete = confirmDelete;
        vm.title = '';
        vm.mode = '';

        activate();

        function activate() {
            loadContact($stateParams.id);
            vm.title = options.title;
            vm.mode = options.mode;
        }

        function loadContact(contactId) {
            vm.contact = ContactsManager.getContact(contactId);
        }

        function submitForm() {
            ContactsManager.saveContact(vm.contact).then(onSaveContact, onSaveContentError);

        }

        function deleteContact() {
            ContactsManager.removeContact(vm.contact.id);
            Notifications.showToast('Contact deleted');
            $rootScope.$broadcast('contactDeleted');
            $state.go('addressbook.list');
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
                $state.go('addressbook.list');
            } else {
                $state.go('addressbook.view', {"id": savedContactId});
            }
        }

        function onSaveContentError() {
            Notifications.showToast('Error saving contact');
        }
    };
})();