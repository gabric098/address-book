"use strict";

require('angular');
require('angular-ui-router');
require('lodash');
var addressbook = require('./addressbook');
var common = require('./common');
var contact = require('./contact');

angular
    .module('app', [
        'ui.router',
        addressbook.name,
        common.name,
        contact.name
    ])
    .controller('AppController', require('./main/app.controller'))
    .config(require('./app.config'));