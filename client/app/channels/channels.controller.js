'use strict';

angular.module('havenApp')
.controller('ChannelsCtrl', function(channelService, $scope, socketFactory) {
    var vm = this;
    vm.newMessage = 'type new message here';

    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('', {
      // Send auth token on connection, you will need to DI the Auth service above
      // 'query': 'token=' + Auth.getToken()
      path: '/socket.io-client'
    });

    var socket = socketFactory({ ioSocket });

    channelService.getChannels().then(function(response) {
      vm.channels = response.data;
      vm.selectedChannel = vm.channels.length > 0 ? vm.channels[0] : null;

      // socket.syncUpdates('message', vm.selectedChannel.messages);
      // TODO: I need to handle messages that arrive on other channels.
      socket.on('message:save', function(eventData) {
        var message = eventData.message;
        var channelId = eventData.channelId;
        var affectedChannel = channelService.findById(channelId);
        var oldMessage = _.find(affectedChannel.messages, {_id: message._id});
        var index = affectedChannel.messages.indexOf(oldMessage);
        // translate to my language of choice based upon who I am
        var newMessage = "";

        var translationTable = angular.module('havenApp').translationTable;
        // SEND request to google translate
        var APIKEY = "AIzaSyDtE3oif_9mIi20aU8Fva2QLgMJcuiNwa0";
        $.ajaxSetup({"async": false});
        var res = $.get("https://www.googleapis.com/language/translate/v2" +
          "?key=" + APIKEY +
          "&source=" + translationTable.from +
          "&target=" + translationTable.to +
          "&q=" + message.text,
          function(data) {
            newMessage = data["data"]["translations"][0]["translatedText"];
          }
        );
        message.text = newMessage;
        // replace oldMessage if it exists        // otherwise just add message to the collection
        if (oldMessage) {
          affectedChannel.messages.splice(index, 1, message);
        } else {
          affectedChannel.messages.push(message);
        }
      });
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('message');
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
