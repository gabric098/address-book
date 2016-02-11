"use strict";

require('angular');
require('angular-ui-router');
require('angular-material');
require('angular-material-icons');
require('lodash');
var addressbook = require('./addressbook');
var common = require('./common');
var contact = require('./contact');
var contactEditor = require('./contactEditor');
var templates = require('./templates');

angular
    .module('app', [
        'ui.router',
        'ngMaterial',
        'ngMdIcons',
        addressbook.name,
        common.name,
        contact.name,
        templates.name,
        contactEditor.name
    ])
    .config(require('./app.config'));