module.exports = function ContactEditorController($state, $stateParams, ContactsManager) {
    "ngInject";
console.log('aa');
    var vm = this;
    vm.contact = ContactsManager.getContact($stateParams.id);

    vm.submitForm = function() {
        ContactsManager.saveContact(vm.contact);
        $state.transitionTo('addressbook.list');
    }
};