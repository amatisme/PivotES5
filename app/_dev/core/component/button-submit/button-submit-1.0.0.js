/** COMPONENT BUTTONSUBMIT - 1.0.0 *********************************************/
var buttonsubmit_html = '';
buttonsubmit_html += '<ul data-ng-show="buttonsubmitCtrl.validate && !buttonsubmitCtrl.object.$valid">';
buttonsubmit_html += '<li><i class="material-icons">error_outline</i></li>';
buttonsubmit_html += '<li class="palette-tint">';
buttonsubmit_html += '<span>Please fill out all required fields.</span>';
buttonsubmit_html += '</li>';
buttonsubmit_html += '</ul>';
buttonsubmit_html += '<button type=submit data-ng-click=buttonsubmitCtrl.callback() data-ng-if=buttonsubmitCtrl.object.$valid>';
buttonsubmit_html += '<span data-ng-if=buttonsubmitCtrl.label>{{buttonsubmitCtrl.label}}</span>';
buttonsubmit_html += '<span data-ng-if=!buttonsubmitCtrl.label>Submit</span>';
buttonsubmit_html += '</button>';

var buttonsubmit_css = '';
buttonsubmit_css += '<style>';
buttonsubmit_css += 'buttonsubmit-component { display: block; position: relative; }';
buttonsubmit_css += 'buttonsubmit-component label { font-size: 0.9rem; opacity: 0.8; }';
buttonsubmit_css += 'buttonsubmit-component label:first-child { font-size: 1.5rem; opacity: 1; }';
buttonsubmit_css += 'buttonsubmit-component > ul { display: table; width: 100%; padding: 0; margin: 0; background-color: ORANGERED; }';
buttonsubmit_css += 'buttonsubmit-component > ul * { color: WHITE; }';
buttonsubmit_css += 'buttonsubmit-component > ul > li { display: table-cell; padding: 1rem; }';
buttonsubmit_css += 'buttonsubmit-component > ul > li:first-child { width: 1%; }';
buttonsubmit_css += 'buttonsubmit-component > ul > li:last-child { width: 100%; }';
buttonsubmit_css += '</style>';

function buttonsubmitComponentCtrl($location) {
  var buttonsubmitCtrl = this;

  buttonsubmitCtrl.$onInit = function() {
    if(!buttonsubmitCtrl.yalign) buttonsubmitCtrl.yalign = "middle"; //default
  }

  buttonsubmitCtrl.callback = function() {
    buttonsubmitCtrl.object.$valid = false;
    buttonsubmitCtrl.callbackFn({obj:
        {
            icon: buttonsubmitCtrl.icon,
            label: buttonsubmitCtrl.label,
            summary: buttonsubmitCtrl.summary
        }
    });
  }
}
const buttonsubmitComponent = {
  controller: buttonsubmitComponentCtrl,
  controllerAs: 'buttonsubmitCtrl',
  bindings: {
    callbackFn: '&',
    object: '=',
    validate: '<',
    label: '<'
  },
  template: buttonsubmit_css + buttonsubmit_html
};
angular.module('app').component('buttonsubmitComponent', buttonsubmitComponent);