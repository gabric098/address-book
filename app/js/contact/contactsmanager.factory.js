/**
 * Exposes the basic functionalities needed to manage the contact list (add/remove/get/save/load)
 */
(function () {
    'use strict';
    module.exports = function contactsManager($q, LocalStorageAdapter, Contact) {
        "ngInject";

        /**
         * The list of models (contacts)
         * @type {object}
         */
        var modelslist = {};
        /**
         * The key used to store/retrieve data from local storage adapter
         * @type {string}
         */
        var storageKeyName = 'addressbook';

        var service = {
            saveContact: saveContact,
            removeContact: removeContact,
            getAllContacts: getAllContacts,
            getContact: getContact
        };

        return service;

        /**
         * Loads contacts data from the storage adapter
         *
         * @returns {promise}
         */
        function loadFromStorage() {
            return LocalStorageAdapter.getItem(storageKeyName).then(function(data) {
                modelslist = data;
            }, function() {
                // if something goes wrong, let's use a clean empty object
                modelslist = {};
                return $q.reject();
            });
        }

        /**
         * Persists the modelList to the storage
         *
         * @returns {promise}
         */
        function saveToStorage() {
            return LocalStorageAdapter.setItem(storageKeyName, modelslist);
        }

        /**
         * Loops through all the models, retrives the highest index
         * and returns the next available index.
         *
         * @returns {number} The new index
         */
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

        /**
         * Returns a promise containing the contact specified by the provided id.
         * If it's not found, the promise is rejected
         *
         * @param id
         * @returns {promise}
         */
        function getContact(id) {
            return loadFromStorage().then(function() {
                if (modelslist.hasOwnProperty(id)) {
                    return new Contact(modelslist[id]);
                }
                return $q.reject({
                    message: 'Contact not found'
                });
            });
        }

        /**
         * Returns a promise containing the list of
         * all the contacts loaded from the storage
         *
         * @returns {promise}
         */
        function getAllContacts() {
            return loadFromStorage().then(function() {
                var contacts = [];
                _.each(modelslist, function (value) {
                    contacts.push(new Contact(value));
                });
                return contacts;
            });
        }

        /**
         * Returns a promise representing the save operation result
         *
         * @param contact {object} The contact to save
         * @returns {promise}
         */
        function saveContact(contact) {
            if (contact.id) {
                return updateContact(contact.id, contact);
            } else {
                return addContact(contact);
            }
        }

        /**
         * When adding a new contact to the storage, it returns
         * a promise containing the id of the just added contact
         *
         * @param contact {object} The new contact to add
         * @returns {promise}
         */
        function addContact(contact) {
            var newKey = getNewKey();
            contact.id = newKey;
            modelslist[newKey] = contact;
            return saveToStorage().then(function() {
                return newKey;
            });
        }

        /**
         * When updating an existing contact, it returns a promise
         * containing the id of the contact uddated
         *
         * @param id {string} The id of the user to update
         * @param contact {object} The updated contact object to save
         * @returns {promise}
         */
        function updateContact(id, contact) {
            modelslist[id] = contact;
            return saveToStorage().then(function() {
                return id;
            });
        }

        /**
         * It returns a promise representing the result
         * of the delete operation
         * @param id {string} the contact to remove
         * @returns {promise}
         */
        function removeContact(id) {
            if (_.has(modelslist, id)) {
                delete modelslist[id];
                return saveToStorage();
            }
        }
    };
})();