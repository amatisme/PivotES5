/********************************************************************************
** COMPONENT - SIGNOUT - 1.0.0 **************************************************
********************************************************************************/
var signout_html = '';
signout_html += '<div>';
signout_html += '<button data-ng-click=signoutCtrl.SetInfo()>';
signout_html += '<i class="material-icons" title="Signed in as {{signoutCtrl.user.first_name}} {{signoutCtrl.user.last_name}}">how_to_reg</i>';
signout_html += '<span data-ng-if=signoutCtrl.showname>Hello, {{signoutCtrl.user.first_name}}</span>';
signout_html += '</button>';
signout_html += '<button data-ng-click=signoutCtrl.Signout() title="Sign Out"><i class="material-icons">exit_to_app</i>Signout</button>';
signout_html += '</div>';

var signout_css = '';
signout_css += '<style>';
signout_css += 'signout-component { display: block; position: relative; }';
signout_css += 'signout-component > div { display: table; padding: 0 1rem; white-space: nowrap; }';
signout_css += 'signout-component > div > button { display: table-cell; white-space: nowrap; min-height: 60px; min-width: 60px; font-size: .8rem; }';
signout_css += 'signout-component > div > button:nth-child(2) { padding-left: 1rem; }';
signout_css += '</style>';

function signoutCtrl($route)
{
  var signoutCtrl = this;
  signoutCtrl.$onInit = function() {}

  signoutCtrl.SetInfo = function() {
    signoutCtrl.info = !signoutCtrl.info;
  }

  signoutCtrl.Signout = function() {
    window.localStorage.removeItem("authorized_apikey");
    window.localStorage.removeItem(md5("authorized_user"));
    $route.reload();
  }
}

const signoutComponent = {
  controller: signoutCtrl,
  controllerAs: 'signoutCtrl',
  bindings: {
    user: '<',
    showname: '<?'
  },
  template: signout_css + signout_html
};

angular.module('app').component('signoutComponent', signoutComponent);
