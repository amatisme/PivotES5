/** COMPONENT - ACCORDION - 1.0.0 *********************************************/
var accordion_html = '';
accordion_html += '<ul data-ng-click="open=!open">';
accordion_html += '<li><span>{{accordionCtrl.label}}</span></li>';
accordion_html += '<li>';
accordion_html += '<i class="material-icons" data-ng-if=!open>add</i>';
accordion_html += '<i class="material-icons" data-ng-if=open>remove</i>';
accordion_html += '</li>';
accordion_html += '</ul>';
accordion_html += '<div data-ng-show=open>';
accordion_html += '<div data-ng-repeat="each in accordionCtrl.detail">';
accordion_html += '<div class="rich-text" data-ng-bind-html="each.data" data-ng-if="each.component == \'html\'"></div>';
accordion_html += '<img class="rich-text" data-ng-src={{each.data.url}} data-ng-if="each.component == \'image\'" />';
accordion_html += '</div>';
accordion_html += '</div>';

var accordion_css = '';
accordion_css += '<style>';
accordion_css += 'accordion-component { display: block; position: relative; border-width: 1px; border-style: solid; border-radius: 3px; margin-bottom: .5rem; }';
accordion_css += 'accordion-component * { margin: 0; padding: 0; }';
accordion_css += 'accordion-component > ul { display: table; }';
accordion_css += 'accordion-component > ul > li { display: table-cell; padding: .5rem; }';
accordion_css += 'accordion-component > ul > li:first-child { width: 100%; }';
accordion_css += 'accordion-component > ul > li:first-child > span { font-size: 1.1rem; vertical-align: middle; }';
accordion_css += 'accordion-component > ul > li:last-child { width: 1%; }';
accordion_css += 'accordion-component > ul > li:last-child > i { border-width: 1px; border-style: solid; }';
accordion_css += 'accordion-component > div { padding: 1rem; background-color: WHITESMOKE; border-top-width: 1px; border-top-style: solid; }';
accordion_css += 'accordion-component > div > div > div > ul { margin: 0 0 1rem 2rem; padding: 0;}';
accordion_css += 'accordion-component > div > div > div > ul > li { margin:0; padding: 0;}';
accordion_css += '</style>';

function AccordionComponentCtrl() {
  var accordionCtrl = this;

  accordionCtrl.Callback = function(index,obj) {
    accordionCtrl.callbackFn({obj:obj});
  }
}
const accordionComponent = {
  controller: AccordionComponentCtrl,
  controllerAs: 'accordionCtrl',
  bindings: {
    callbackFn: '&',
    object: '<',
    label: '<',
    detail: '<'
  },
  template: accordion_css + accordion_html
};
angular.module('app').component('accordionComponent', accordionComponent);