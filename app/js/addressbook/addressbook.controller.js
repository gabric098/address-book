module.exports = function AddressbookController($state, ContactsManager) {
    "ngInject";

    var vm = this;
    vm.contacts = ContactsManager.getAllContacts();



    vm.view = function(id) {

        $state.go('addressbook.view', { id: id });
    }
};
