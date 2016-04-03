'use strict';

angular.module('havenApp')
  .controller('ChannelsCtrl', function(channelService) {
    var vm = this;
    vm.newMessage = 'type new message here';

    channelService.getChannels().then(function(response) {
      vm.channels = response.data;
      vm.selectedChannel = vm.channels.length > 0 ? vm.channels[0] : null;

    });

    vm.setSelected = function(channel) {
      vm.selectedChannel = channel;
    };

    vm.isSelected = function(channel) {
      return channel._id === vm.selectedChannel._id;
    };

    vm.sendMessage = function() {
      channelService.sendMessage(vm.newMessage, vm.selectedChannel)
      .then(function(response) {
        vm.newMessage = 'type new message here';
      });
    };
  });
