module.exports = function AddressbookController($scope, $state, $rootScope, ContactsManager) {
    "ngInject";

    var vm = this;

    vm.view = function(id) {
        $state.go('addressbook.view', { id: id });
    };

    vm.delete = function(id) {
        ContactsManager.removeContact(id);
        $state.go('addressbook.list');
    };

    vm.refreshContacts = function() {
        vm.contacts = ContactsManager.getAllContacts();
    };

    vm.unbindListeners = function() {
        lstHandlerAdd();
        lstHandlerDel();
    };

    vm.refreshContacts();

    var lstHandlerAdd = $rootScope.$on('contactUpdated', vm.refreshContacts);
    var lstHandlerDel = $rootScope.$on('contactDeleted', vm.refreshContacts);
    $scope.$on('$destroy', vm.unbindListeners);
};
