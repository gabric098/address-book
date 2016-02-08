module.exports = function contactFactory(ContactsManager) {
    "ngInject";

    function Contact(contactData) {
        if (contactData) {
            this.setData(contactData);
        }
    }

    Contact.prototype = {
        setData: function(contactData) {
            angular.extend(this, contactData);
        },

        load: function(id) {
            var contactData = ContactsManager.getContact(id);
            if (contactData) {
                this.setData(contactData);
            }
        },

        delete: function() {
            ContactsManager.removeModel(this.id);
        },

        save: function() {
            ContactsManager.saveContact(this);
        }
    };

    return Contact;
};
