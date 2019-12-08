/** COMPONENT TAB - 1.0.0 ******************************************************/
var tab_html = '';
tab_html += '<ul>';
tab_html += '<li data-ng-repeat="each in tabCtrl.objects">';
tab_html += '<button data-ng-class="{\'active\' : tabCtrl.index == $index}" data-ng-click=tabCtrl.Callback($index,each)>';
tab_html += '{{each}}';
tab_html += '</button>';
tab_html += '</li>';
tab_html += '<li class="ui-stretch"></li>';
tab_html += '</ul>';

var tab_css = '';
tab_css += '<style>';
tab_css += 'tab-component * { margin: 0; padding: 0; }';
tab_css += 'tab-component { display: block; position: relative; border-bottom-style: solid; border-bottom-width: 3px; }';
tab_css += 'tab-component > ul { display: table; }';
tab_css += 'tab-component > ul > li { display: table-cell; }';
tab_css += 'tab-component > ul > li:last-child { width: 100%; }';
tab_css += 'tab-component > ul > li > button { border: none; min-height: 3.5rem; min-width: 6rem; background-color: transparent; white-space: nowrap; }';
tab_css += 'tab-component > ul > li > button.active { background-color: RGB(0,0,0); color: RGB(255,255,255); }';
tab_css += '@media only screen and (max-width: 375px) {';
tab_css += 'tab-component > ul, tab-component > ul > li, tab-component > ul > li > button { display: block; width: 100%; }';
tab_css += '}';
tab_css += '</style>';

function TabComponentCtrl() {
  var tabCtrl = this;
  tabCtrl.index = 0;

  tabCtrl.Callback = function(index,obj) {
    tabCtrl.index = index;
    tabCtrl.callbackFn({obj:{label:obj,index:index}});
  }
}
const tabComponent = {
  controller: TabComponentCtrl,
  controllerAs: 'tabCtrl',
  bindings: {
    callbackFn: '&',
    objects: '<'
  },
  template: tab_css + tab_html
};
angular.module('app').component('tabComponent', tabComponent);
