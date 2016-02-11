module.exports = function contactsManager(LocalStorageAdapter, Contact) {
    "ngInject";

    var modelslist = {};

    function loadFromStorage() {
        var item = LocalStorageAdapter.getItem('addressbook');
        if (item && item !== '') {
            modelslist = JSON.parse(item);
        }
    }

    function saveToStorage() {
        LocalStorageAdapter.setItem('addressbook', JSON.stringify(modelslist));
    }

    function getNewKey() {
        loadFromStorage();
        var lastKey = 0;

        _.each(modelslist, function(value, key) {
            var currentKey = parseInt(key);
            if (currentKey > lastKey) {
                lastKey = currentKey;
            }
        });
        return lastKey+1;
    }

    function getContact(id) {
        loadFromStorage();
        var contact = null;
        if (modelslist.hasOwnProperty(id)) {
            contact = new Contact(modelslist[id]);
        }
        return contact;
    }

    function getAllContacts() {
        loadFromStorage();
        var contacts = [];
        _.each(modelslist, function(value, key) {
            contacts.push(new Contact(value));
        });
        return contacts;
    }

    function saveContact(contact) {
        if (contact.id) {
            updateContact(contact.id, contact);
        } else {
            addContact(contact);
        }
        return contact.id;
    }

    function addContact(contact) {
        var newKey = getNewKey();
        contact.id = newKey;
        modelslist[newKey] = contact;
        saveToStorage();
        return newKey;
    }

    function updateContact(id, contact) {
        loadFromStorage();
        modelslist[id] = contact;
        saveToStorage();
    }

    function removeContact(id) {
        if (_.has(modelslist, id)) {
            delete modelslist[id];
            saveToStorage();
        }
    }


    return  {
        saveContact: saveContact,
        removeContact: removeContact,
        getAllContacts: getAllContacts,
        getContact: getContact
    }
};