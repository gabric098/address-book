module.exports = function AppController(Contact, ContactsManager) {
    "ngInject";

    var vm = this;
    vm.appName = 'AddressBook';
    vm.appVersion = '1.0';
    var model1 = {
        "name":"Gabriele",
        "surname":"Antonini",
        "email" :"gabriele.antonini@gmail.com",
        "address" : "Via le dita dal naso 3",
        "city": "Genova",
        "zip": "16100",
        "country":"IT"
    };
    var model2 = {
        "name":"Angeliki",
        "surname":"Kiakotou",
        "email" :"ang@gmail.com",
        "address" : "Athens",
        "city": "Athens",
        "zip": "0000",
        "country":"GR"
    };
    var contact = new Contact(model1);
    contact.save();
    var contact = new Contact(model2);
    contact.save();
    console.log(ContactsManager.getAllContacts());
};