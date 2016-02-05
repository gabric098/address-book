"use strict";

require('angular');
require('angular-ui-router');
require('lodash');
var addressbook = require('./addressbook');
var common = require('./common');

angular
    .module('app', [
        'ui.router',
        addressbook.name,
        common.name
    ])
    .controller('AppController', require('./main/app.controller'))
    .config(require('./app.config'));