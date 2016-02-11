(function () {
    'use strict';
    module.exports = angular
        .module('app.contactEditor', [])
        .controller('ContactEditorController', require('./contactEditor.controller'));
})();