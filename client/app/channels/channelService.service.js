'use strict';

angular.module('havenApp')
  .service('channelService', function($http) {

    var svc = this;
    svc.channels = [];

    svc.getChannels = function() {
      var promise= $http.get('/api/channels');
      promise.then(function(response) {
        svc.channels = response.data;
      });
      return promise;
    };

    svc.sendMessage = function(newMessage, channel) {
      return $http.post('/api/messages',
                        { text: newMessage,
                          channelId: channel._id
                        });
    };

    svc.findById = function(id) {
      return _.find(svc.channels, function(channel) {
        return channel._id === id;
      });
    };
  });
