(function () {
    'use strict';
    module.exports = function ContactEditorController($state, $rootScope, $stateParams, ContactsManager, $mdDialog, NotificationsService, options) {
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
            loadContact($stateParams.id)
            vm.title = options.title;
            vm.mode = options.mode;
        }

        function loadContact(contactId) {
            vm.contact = ContactsManager.getContact(contactId);
        }

        function submitForm() {
            var savedContactId = ContactsManager.saveContact(vm.contact);
            $rootScope.$broadcast('contactUpdated');
            NotificationsService.showToast('New Contact created');
            $state.go('addressbook.view', {"id": savedContactId});
        }

        function deleteContact() {
            ContactsManager.removeContact(vm.contact.id);
            NotificationsService.showToast('Contact deleted');
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
    };
})();