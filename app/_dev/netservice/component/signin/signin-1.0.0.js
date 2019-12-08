/** COMPONENT NETSERVICES SIGNIN - 1.0.0 ***************************************/
var signin_html = '';
signin_html += '<div>';
signin_html += '<img data-ng-src="{{signinCtrl.image}}" alt="Brand Image" />';
signin_html += '</div>';
signin_html += '<ul>';
signin_html += '<li>';
signin_html += '<select name=select-user data-ng-model=signinCtrl.object data-ng-options="each as each.label for each in signinCtrl.options" data-ng-required=signinCtrl.required data-ng-change=signinCtrl.callback()>';
signin_html += '<option value="">Please Sign In</option>';
signin_html += '</select>';
signin_html += '</li>';
signin_html += '<li data-ng-if="signinCtrl.required">';
signin_html += '<i class="material-icons set" data-ng-if="signinCtrl.object">done</i>';
signin_html += '<i class="material-icons unset" data-ng-if="!signinCtrl.object">error_outline</i>';
signin_html += '</li>';
signin_html += '</ul>';

var signin_css = '';
signin_css += '<style type="text/css">';
signin_css += 'signin-component { display: block; position: relative; width: 15rem; margin: 0 auto; padding: 3rem 0; }';
signin_css += 'signin-component > div { bottom: 0; width: 100%; text-align: center; }';
signin_css += 'signin-component > ul { display: table; margin: 0; padding: 0; width: 100%; }';
signin_css += 'signin-component > ul > li { display: table-cell; }';
signin_css += 'signin-component > ul > li:first-child { width: 100%; }';
signin_css += '</style>';

function signinCtrl($http)
{
  var signinCtrl = this;
  
  signinCtrl.$onInit = function() {
    $http.get('https://netservices.internal.ca/lib/EmployeeService.svc/json/employee').then(function(response) {
      signinCtrl.options = response.data.ActiveEmployeesResult.map(item => {
        return {
          label: item.FullName,
          value: item
        };
      }).sort();
    });
  }

  signinCtrl.callback = function() {
    if(signinCtrl.callbackFn != undefined) signinCtrl.callbackFn({obj:signinCtrl.object.value});
  }
}
const signinComponent = {
  controller: signinCtrl,
  controllerAs: 'signinCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    image: '<?'
  },
  template: signin_css + signin_html
};
angular.module('app').component('signinComponent', signinComponent);