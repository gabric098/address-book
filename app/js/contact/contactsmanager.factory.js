(function () {
    'use strict';
    module.exports = function contactsManager($q, LocalStorageAdapter, Contact, Notifications) {
        "ngInject";

        var modelslist = {};
        var storageKeyName = 'addressbook';

        var service = {
            saveContact: saveContact,
            removeContact: removeContact,
            getAllContacts: getAllContacts,
            getContact: getContact
        };

        return service;

        /**
         * Load contacts data from the storage adapter storage
         */
        function loadFromStorage() {
            return LocalStorageAdapter.getItem(storageKeyName).then(function(data) {
                modelslist = data;
                console.log(data);
            }, function() {
                // if something goes wrong, let's use a clean empty object
                modelslist = {};
                return $q.reject();
            });
        }

        function saveToStorage() {
            return LocalStorageAdapter.setItem(storageKeyName, modelslist);
        }

        function getNewKey() {
            var lastKey = 0;
            _.each(modelslist, function (value, key) {
                var currentKey = parseInt(key);
                if (currentKey > lastKey) {
                    lastKey = currentKey;
                }
            });
            return lastKey + 1;
        }

        function getContact(id) {
            loadFromStorage().then(function() {
                var contact = null;
                if (modelslist.hasOwnProperty(id)) {
                    contact = new Contact(modelslist[id]);
                }
                return contact;
            });
        }

        function getAllContacts() {
            return loadFromStorage().then(function() {
                var contacts = [];
                _.each(modelslist, function (value) {
                    contacts.push(new Contact(value));
                });
                return contacts;
            });
        }

        function saveContact(contact) {
            if (contact.id) {
                return updateContact(contact.id, contact);
            } else {
                return addContact(contact);
            }
        }

        function addContact(contact) {
            var newKey = getNewKey();
            contact.id = newKey;
            modelslist[newKey] = contact;
            return saveToStorage().then(function() {
                return newKey;
            });
        }

        function updateContact(id, contact) {
            modelslist[id] = contact;
            return saveToStorage().then(function() {
                return id;
            });
        }

        function removeContact(id) {
            if (_.has(modelslist, id)) {
                delete modelslist[id];
                return saveToStorage();
            }
        }
    };
})();