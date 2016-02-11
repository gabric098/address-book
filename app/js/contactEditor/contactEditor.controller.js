(function () {
    'use strict';
    module.exports = function ContactEditorController($state, $rootScope, $stateParams, ContactsManager, $mdDialog, $mdSidenav, NotificationsService) {
        "ngInject";

        //$mdSidenav('left').close();

        var vm = this;
        vm.contact = ContactsManager.getContact($stateParams.id);

        vm.submitForm = function () {
            var savedContactId = ContactsManager.saveContact(vm.contact);
            $rootScope.$broadcast('contactUpdated');
            NotificationsService.showToast('New Contact created');
            $state.go('addressbook.view', {"id": savedContactId});
        };

        vm.deleteContact = function () {
            ContactsManager.removeContact(vm.contact.id);
            NotificationsService.showToast('Contact deleted');
            $rootScope.$broadcast('contactDeleted');
            $state.go('addressbook.list');
        };

        vm.confirmDelete = function () {
            var confirm = $mdDialog.confirm()
                .title('Do you really want to delete this contact?')
                .textContent('The contact will be permanently deleted.')
                .ariaLabel('Confirm deletion')
                .ok('Yes, delete it')
                .cancel('No, I still need it');
            $mdDialog.show(confirm).then(function () {
                vm.deleteContact();
            });
        };

        vm.back = function () {
            $mdSidenav('left').open();
        };
    };
})();