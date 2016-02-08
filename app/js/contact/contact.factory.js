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
        }
    };

    return Contact;
};
