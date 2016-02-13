(function () {
    'use strict';
    module.exports = function addressbookConfig($stateProvider) {
        "ngInject";

        $stateProvider
            .state('addressbook', {
                abstract: true,
                controller: "AddressbookController",
                controllerAs: 'AddressBook',
                templateUrl: "addressbook/views/addressbook.html",
                resolve: {
                    contactsPrepService: contactsPrepService
                }
            })
            .state('addressbook.list', {
                url: "/addressbook",
                views: {
                    "leftArea": {
                        templateUrl: "addressbook/views/list.html"
                    },
                    "rightArea": {
                        templateUrl: "addressbook/views/index.html"
                    }
                }
            })
            .state('addressbook.view', {
                url: "/view/:id",
                controller: "ContactEditorController",
                controllerAs: 'Editor',
                views: {
                    "leftArea": {
                        templateUrl: "addressbook/views/list.html"
                    },
                    "rightArea": {
                        controller: "ContactEditorController",
                        controllerAs: 'ContactEditor',
                        templateUrl: "contactEditor/views/editor.html"
                    }
                },
                resolve: {
                    /* @ngInject */
                    options: function () {
                        return {
                            title: 'View/Edit contact',
                            mode: 'view'
                        }
                    },
                    contactPrepService: contactPrepService
                }
            })
            .state('addressbook.add', {
                url: "/add",
                controller: "ContactEditorController",
                controllerAs: 'Editor',
                views: {
                    "leftArea": {
                        templateUrl: "addressbook/views/list.html"
                    },
                    "rightArea": {
                        controller: "ContactEditorController",
                        controllerAs: 'ContactEditor',
                        templateUrl: "contactEditor/views/editor.html"
                    }
                },
                resolve: {
                    /* @ngInject */
                    options: function () {
                        return {
                            title: 'Add new contact',
                            mode: 'add'
                        }
                    },
                    contactPrepService: function () {
                        return {};
                    }
                }
            });


        function contactsPrepService(ContactsManager) {
            /* @ngInject */
            return ContactsManager.getAllContacts();
        }

        function contactPrepService(ContactsManager, $stateParams) {
            /* @ngInject */
            return ContactsManager.getContact($stateParams.id);
        }
    };
})();