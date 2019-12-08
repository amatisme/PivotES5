/** COMPONENT BUTTONSUBMITASYNC ************************************************/
var buttonsubmitasync_html = '';
buttonsubmitasync_html += '<ul class="ui-table" responsive-block>';
buttonsubmitasync_html += '<li class="ui-stretch" responsive-block>';
buttonsubmitasync_html += '<button class="ui-stretch" type="submit" data-ng-click=buttonsubmitasyncCtrl.callback() data-ng-if=!buttonsubmitasyncCtrl.onpromise>{{buttonsubmitasyncCtrl.label}}</button>';
buttonsubmitasync_html += '<div class="ui-border ui-padding ui-text-center loader" data-ng-if=buttonsubmitasyncCtrl.onpromise>';
buttonsubmitasync_html += '<img data-ng-src="/milib/v/1.2/assets/ajax-loader.gif" />';
buttonsubmitasync_html += '</div>';
buttonsubmitasync_html += '</li>';
buttonsubmitasync_html += '</ul>';

var buttonsubmitasync_css = '';
buttonsubmitasync_css += '<style>';
buttonsubmitasync_css += 'buttonsubmitasync-component { display: block; position: relative; }';
buttonsubmitasync_css += 'buttonsubmitasync-component .loader, buttonsubmitasync-component .loader * { background-color: WHITE !important; }';
buttonsubmitasync_css += 'buttonsubmitasync-component .loader { border: 3px solid RGB(82,98,114); }';
buttonsubmitasync_css += '</style>';

function ButtonSubmitAsyncComponentCtrl() {
  const buttonsubmitasyncCtrl = this;
  buttonsubmitasyncCtrl.$onInit = function() {}
  buttonsubmitasyncCtrl.callback = function() {
    buttonsubmitasyncCtrl.callbackFn();
  }
}
const buttonsubmitasyncComponent = {
  controller: ButtonSubmitAsyncComponentCtrl,
  controllerAs: 'buttonsubmitasyncCtrl',
  bindings: {
    callbackFn: '&',
    onpromise: '=',
    label: '<'
  },
  template: buttonsubmitasync_css + buttonsubmitasync_html
};
angular.module('app').component('buttonsubmitasyncComponent', buttonsubmitasyncComponent);
