module.exports = function ContactEditorController($state, $stateParams, ContactsManager, $mdDialog, NotificationsService) {
    "ngInject";

    var vm = this;
    vm.contact = ContactsManager.getContact($stateParams.id);

    vm.submitForm = function() {
        var savedContactId = ContactsManager.saveContact(vm.contact);
        NotificationsService.showToast('New Contact created');
        $state.go('addressbook.view', {"id" : savedContactId});
    };

    vm.deleteContact = function() {
        ContactsManager.removeContact(vm.contact.id);
        NotificationsService.showToast('Contact deleted');
        $state.go('addressbook.list');
    };

    vm.confirmDelete = function() {
        var confirm = $mdDialog.confirm()
            .title('Do you really want to delete this contact?')
            .textContent('The contact will be permanently deleted.')
            .ariaLabel('Confirm deletion')
            .ok('Yes, delete it')
            .cancel('No, I still need it');
        $mdDialog.show(confirm).then(function() {
            vm.deleteContact();
        });
    };

    vm.showToast = function() {

    };
};