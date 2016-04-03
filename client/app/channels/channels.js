'use strict';

angular.module('havenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('channels', {
        url: '/chat',
        templateUrl: 'app/channels/channels.html',
        controller: 'ChannelsCtrl',
        controllerAs: 'vm'
      });
  });
