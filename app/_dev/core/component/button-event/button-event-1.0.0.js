/** COMPONENT BUTTONEVENT - 1.0.0 ********************************************/
var buttonevent_html = '';
buttonevent_html += '<button type=button data-ng-model=buttoneventCtrl.object data-ng-click=buttoneventCtrl.callback()>';
buttonevent_html += '<ul data-ng-if=buttoneventCtrl.icon>';
buttonevent_html += '<li style="vertical-align: {{buttoneventCtrl.yalign}};"><i class=material-icons style="font-size:{{buttoneventCtrl.iconsize}};">{{buttoneventCtrl.icon}}</i></li>';
buttonevent_html += '<li style="vertical-align: {{buttoneventCtrl.yalign}};">';
buttonevent_html += '<label>{{buttoneventCtrl.label}}</label>';
buttonevent_html += '<label data-ng-if=buttoneventCtrl.summary>{{buttoneventCtrl.summary}}</label>';
buttonevent_html += '</li>';
buttonevent_html += '</ul>';
buttonevent_html += '<label data-ng-if=!buttoneventCtrl.icon>{{buttoneventCtrl.label}}</label>';
buttonevent_html += '</button>';

var buttonevent_css = '';
buttonevent_css += '<style>';
buttonevent_css += 'buttonevent-component { display: block; position: relative; }';
buttonevent_css += 'buttonevent-component label { font-size: 0.9rem; opacity: 0.8; }';
buttonevent_css += 'buttonevent-component label:first-child { font-size: 1.5rem; opacity: 1; }';
buttonevent_css += 'buttonevent-component > button { display: block; width: 100%; padding: 0; margin: 0; text-align: left; }';
buttonevent_css += 'buttonevent-component > button > ul { display: table; width: 100%; padding: 0; margin: 0; }';
buttonevent_css += 'buttonevent-component > button > ul > li { display: table-cell; }';
buttonevent_css += 'buttonevent-component > button > ul > li:first-child { width: 1%; }';
buttonevent_css += 'buttonevent-component > button > ul > li:last-child { width: 100%; }';
buttonevent_css += '</style>';

function buttoneventComponentCtrl($location) {
  var buttoneventCtrl = this;

  buttoneventCtrl.$onInit = function() {
    if(!buttoneventCtrl.yalign) buttoneventCtrl.yalign = "middle"; //default
    if(!buttoneventCtrl.iconsize) buttoneventCtrl.iconsize = '24px'; //default
  }

  buttoneventCtrl.callback = function() {
    buttoneventCtrl.callbackFn({obj:
        {
            icon: buttoneventCtrl.icon,
            label: buttoneventCtrl.label,
            summary: buttoneventCtrl.summary
        }
    });
  }
}
const buttoneventComponent = {
  controller: buttoneventComponentCtrl,
  controllerAs: 'buttoneventCtrl',
  bindings: {
    callbackFn: '&?',
    object: '=',
    icon: '<?',
    label: '<',
    summary: '<?',
    yalign: '<?',
    iconsize: '<?'
  },
  template: buttonevent_css + buttonevent_html
};
angular.module('app').component('buttoneventComponent', buttoneventComponent);