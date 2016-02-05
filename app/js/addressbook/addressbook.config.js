module.exports = function addressbookConfig($stateProvider) {
    "ngInject";

    $stateProvider
        .state('addressbook', {
            abstract: true,
            templateUrl: "views/addressbook.html",
            controller: "AddressbookController",
            conrollerAs: 'addressbook'
        })
        .state('addressbook.list', {
            url: "/addressbook",
            views: {
                "leftArea": {templateUrl: "views/list.html"},
                "rightArea": {templateUrl: "views/index.html"}
            }
        });
};