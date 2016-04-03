'use strict';

angular.module('havenApp.auth', [
  'havenApp.constants',
  'havenApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
