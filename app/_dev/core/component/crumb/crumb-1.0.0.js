/** COMPONENT CRUMB - 1.0.0 ****************************************************/
var crumb_html = '';
crumb_html += '<ul>';
crumb_html += '<li data-ng-repeat="each in crumbCtrl.objects">';
crumb_html += '<button type=button data-ng-click=crumbCtrl.Callback(each) data-ng-if=each.path>';
crumb_html += '/ {{each.label}}';
crumb_html += '</button>';
crumb_html += '<span data-ng-if=!each.path>';
crumb_html += '/ {{each.label}}';
crumb_html += '</span>';
crumb_html += '</li>';
crumb_html += '</ul>';

var crumb_css = '';
crumb_css += '<style>';
crumb_css += 'crumb-component * { padding:0; margin:0; }';
crumb_css += 'crumb-component { display: block; position: relative;}';
crumb_css += 'crumb-component > ul { display: table; }';
crumb_css += 'crumb-component > ul > li { display: table-cell; font-size: .9em; }';
crumb_css += 'crumb-component > ul > li:last-child { width: 100%; }';
crumb_css += 'crumb-component > ul > li > button { background-color: transparent; color: RGB(0,0,255); text-align: left; min-width:0; min-height:0; white-space: nowrap; margin-right:.5em; }';
crumb_css += 'crumb-component > ul > li > span { opacity: .8; }';
crumb_css += '</style>';

function CrumbComponentCtrl($location) {
  var crumbCtrl = this;
  crumbCtrl.$onInit = function() {
    crumbCtrl.path = $location.path();
  }
  crumbCtrl.Callback = function(obj) {
    if(crumbCtrl.callbackFn) crumbCtrl.callbackFn({obj:obj});
  }
}
const crumbComponent = {
  controller: CrumbComponentCtrl,
  controllerAs: 'crumbCtrl',
  bindings: {
    callbackFn: '&?',
    objects: '<'
  },
  template: crumb_css + crumb_html
};
angular.module('app').component('crumbComponent', crumbComponent);