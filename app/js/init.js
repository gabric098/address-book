"use strict";

require('angular');
require('angular-ui-router');
require('lodash');
var addressbook = require('./addressbook');
var common = require('./common');
var contact = require('./contact');
var contactEditor = require('./contactEditor');
var templates = require('./templates');

angular
    .module('app', [
        'ui.router',
        addressbook.name,
        common.name,
        contact.name,
        templates.name,
        contactEditor.name
    ])
    .controller('AppController', require('./main/app.controller'))
    .config(require('./app.config'));