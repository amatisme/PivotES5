/** COMPONENT NOTIFICATION - 1.0.0 *****************************************************/
var notification_html = '';
notification_html += '<ul>';
notification_html += '<li data-ng-if=notificationCtrl.icon><i class="material-icons">{{notificationCtrl.icon}}</i></li>';
notification_html += '<li>';
notification_html += '<label data-ng-if=notificationCtrl.label>{{notificationCtrl.label}}</label>';
notification_html += '<span>{{notificationCtrl.detail}}</span>';
notification_html += '</li>';
notification_html += '</ul>';

var notification_css = '';
notification_css += '<style>';
notification_css += 'notification-component { display: block; position: relative; }';
notification_css += 'notification-component > ul { display: table; margin: 0; padding: 0; }';
notification_css += 'notification-component > ul > li { display: table-cell; padding: 1em; vertical-align:top; }';
notification_css += 'notification-component > ul > li:first-child { width:1%; }';
notification_css += 'notification-component > ul > li:last-child { background-color:rgba(0,0,0,0.12); }';
notification_css += 'notification-component > ul > li:last-child * { background-color: transparent; }';
notification_css += 'notification-component > ul > li > label { display: block; font-size: 1.5em; }';
notification_css += 'notification-component > ul > li > span { font-size:.9em; opacity: 0.7; }';
notification_css += '</style>';

function NotificationComponentCtrl() {
  var notificationCtrl = this;
  notificationCtrl.Callback = function(index,obj) {
    notificationCtrl.callbackFn({obj:obj});
  }
}
const notificationComponent = {
  controller: NotificationComponentCtrl,
  controllerAs: 'notificationCtrl',
  bindings: {
    callbackFn: '&',
    icon: '<?',
    label: '<?',
    detail: '<'
  },
  template: notification_css + notification_html
};
angular.module('app').component('notificationComponent', notificationComponent);