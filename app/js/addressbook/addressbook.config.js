module.exports = function addressbookConfig($stateProvider) {
    "ngInject";

    $stateProvider
        .state('addressbook', {
            abstract: true,
            templateUrl: "addressbook/views/addressbook.html"
        })
        .state('addressbook.list', {
            url: "/addressbook",
            views: {
                "leftArea": {
                    controller: "AddressbookController",
                    controllerAs: 'AddressBook',
                    templateUrl: "addressbook/views/list.html"},
                "rightArea": {templateUrl: "addressbook/views/index.html"}
            }
        })
        .state('addressbook.view', {
            url: "/view/:id",
            controller: "ContactEditorController",
            controllerAs: 'Editor',
            views: {
                "leftArea": {
                    controller: "AddressbookController",
                    controllerAs: 'AddressBook',
                    templateUrl: "addressbook/views/list.html"},
                "rightArea": {
                    controller: "ContactEditorController",
                    controllerAs: 'ContactEditor',
                    templateUrl: "contactEditor/views/editor.html"
                }
            }
        })
        .state('addressbook.add', {
            url: "/add",
            controller: "ContactEditorController",
            controllerAs: 'Editor',
            views: {
                "leftArea": {
                    controller: "AddressbookController",
                    controllerAs: 'AddressBook',
                    templateUrl: "addressbook/views/list.html"},
                "rightArea": {
                    controller: "ContactEditorController",
                    controllerAs: 'ContactEditor',
                    templateUrl: "contactEditor/views/editor.html"
                }
            }
        });
};