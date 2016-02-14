/**
 * An object representation of an addressbook contact.
 */
(function () {
    'use strict';
    module.exports = function contactFactory() {
        "ngInject";

        /**
         * Constructor, it invokes the setData method passing the
         * contact data object
         *
         * @param contactData {object} the contact data object
         * @constructor
         */
        function Contact(contactData) {
            if (contactData) {
                this.setData(contactData);
            }
        }

        Contact.prototype = {
            /**
             * Sets all the contactData object properies to the
             * current instance
             * @param contactData
             */
            setData: function (contactData) {
                angular.extend(this, contactData);
            },
            /**
             * Returns the full name of the contact
             * concatenating name and surname
             * @returns {string} the contact full name
             */
            fullName: function () {
                return this.name + " " + this.surname;
            }
        };

        return Contact;
    };
})();