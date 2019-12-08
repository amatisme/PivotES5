/********************************************************************************
** COMPONENT - NAV - 1.0.0 ******************************************************
********************************************************************************/
var nav_html = '';
nav_html += '<button title="View Labels" data-ng-click="navCtrl.hide=!navCtrl.hide">';
nav_html += '<i class="material-icons" data-ng-if=navCtrl.hide>menu</i>';
nav_html += '<i class="material-icons" data-ng-if=!navCtrl.hide>close</i>';
nav_html += '</button>';
nav_html += '<button title={{each.label}} data-ng-click=navCtrl.Callback(each) data-ng-repeat="each in navCtrl.objects" data-ng-class="{active: each.path == navCtrl.path}">';
nav_html += '<div><i class="material-icons">{{each.icon}}</i></div>';
nav_html += '<div data-ng-show=!navCtrl.hide>{{each.label}}</div>';
nav_html += '</button>';

var nav_css = '';
nav_css += '<style>';
nav_css += 'nav-component { display: block; position: relative; }';
nav_css += 'nav-component * { background-color: transparent; border: none; }';
nav_css += 'nav-component > button { display: table; width: 100%; padding: .7rem; white-space: nowrap; opacity:0.7; }';
nav_css += 'nav-component > button > div { display: table-cell; vertical-align: middle; width: 1%; }';
nav_css += 'nav-component > button > div:last-child { width: 99%; padding-left: 9px; text-align: left; }';
nav_css += 'nav-component > button.active, nav-component > button:hover { opacity:1; }';
nav_css += 'nav-component > button.size-lock { width: 1%; }';
nav_css += '/* START RESPONSIVE */';
nav_css += '@media only screen and (max-width: 414px) {';
nav_css += 'nav-component > button { width: 100%; }';
nav_css += '}';
nav_css += '/* END RESPONSIVE */';
nav_css += '</style>';

function NavComponentCtrl($location) {
  var navCtrl = this;

  navCtrl.$onInit = function() {
    navCtrl.path = $location.path();
    navCtrl.state = true;

    //hide if mobile
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if(w <= 768) navCtrl.hide = true;
  }

  navCtrl.Callback = function(obj) {
    if(navCtrl.callbackFn) navCtrl.callbackFn({obj:obj});
  }
}

const navComponent = {
  controller: NavComponentCtrl,
  controllerAs: 'navCtrl',
  bindings: {
    callbackFn: '&?',
    objects: '<',
    hide: '='
  },
  template: nav_css + nav_html
};

angular.module('app').component('navComponent', navComponent);
