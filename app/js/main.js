(function () {

  'use strict';

  require('angular');
  require('angular-ui-router');
  var mainCtrl = require('./controllers/mainctrl');

  angular.module('SampleApp', ['ui.router'])

  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise("/index");

      $stateProvider
          .state('index', {
            url: "index",
            views: {
              "leftPanel": { templateUrl: "partials/left.index.html" },
              "rightPanel": { templateUrl: "partials/right.index.html" }
            }
          })
          .state('add', {
            url: "add",
            views: {
              "leftPanel": { templateUrl: "partials/left.add.html" },
              "rightPanel": { templateUrl: "partials/right.add.html" }
            }
          });
    }
  ])

  //Load controller
  .controller('MainController', ['$scope', mainCtrl]);

}());