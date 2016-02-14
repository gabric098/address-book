/**
 * addressbook module configuration.
 * Routing: addressbook is a base abstract view from which all the other routes inherit.
 * Note: addressbook.view and addressbook.add should have a common abstract ancestor route since
 * they're sharing the same controller and most of the initialization logic
 */
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


        /**
         * Retrieves all the contacts.
         * It's used as a resolver in the addressbook route
         * initialization.
         *
         * @param ContactsManager
         * @returns {*|promise} A promise object containing all the contacts
         */
        function contactsPrepService(ContactsManager) {
            /* @ngInject */
            return ContactsManager.getAllContacts();
        }

        /**
         * Retrieves a specific contact identified by the id.
         * It's used as a resolver in the addressbook.view route initialization
         *
         * @param ContactsManager
         * @param $stateParams
         * @returns {*|promise} A promise object containing the specified contact
         */
        function contactPrepService(ContactsManager, $stateParams) {
            /* @ngInject */
            return ContactsManager.getContact($stateParams.id);
        }
    };
})();