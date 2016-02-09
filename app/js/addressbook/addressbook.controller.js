module.exports = function AddressbookController($state, ContactsManager) {
    "ngInject";

    var vm = this;
    vm.contacts = ContactsManager.getAllContacts();

    vm.view = function(id) {
        $state.go('addressbook.view', { id: id });
    };

    vm.delete = function(id) {

        ContactsManager.removeContact(id);
        $state.go('addressbook.list');
    };
};
