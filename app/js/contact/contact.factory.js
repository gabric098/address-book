module.exports = function contactFactory() {
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
        fullName: function() {
            return this.name + " " + this.surname;
        }
    };

    return Contact;
};
