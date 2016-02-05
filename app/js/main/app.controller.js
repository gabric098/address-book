module.exports = function AppController(ModelList) {
    "ngInject";

    var vm = this;
    vm.appName = 'AddressBook';
    vm.appVersion = '1.0';
    var model = {
        "name":"GAbriele",
        "surname":"Antonini"
    };
    ModelList.addModel(model);
    console.log(ModelList.getModelById(3));
    console.log ('model added');
};