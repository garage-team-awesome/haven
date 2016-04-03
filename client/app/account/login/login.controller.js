'use strict';

class LoginController {
  constructor(Auth, $state) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        var translationTable = {
          "to": "en",
          "from": "en"
        }

        switch (this.user.email) {
          case "adar@example.com":
            translationTable.to = "fa";
            break;
          default:
            translationTable.from = "fa";
            break
        }
        angular.module('havenApp')['translationTable'] = translationTable;
        this.$state.go('main');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('havenApp')
  .controller('LoginController', LoginController);
