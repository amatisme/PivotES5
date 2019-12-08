/** COMPONENT CELLSTUB - 1.0.1 *************************************************/
var cellstub_html = '';
cellstub_html += '<ul>';
cellstub_html += '<li>';
cellstub_html += '<label id=cellstub-label data-ng-if=cellstubCtrl.object.label><b>{{cellstubCtrl.object.label}}</b></label>';
cellstub_html += '<label id=cellstub-sublabel data-ng-if=cellstubCtrl.object.sublabel>{{cellstubCtrl.object.sublabel}}</label>';
cellstub_html += '<label id=cellstub-description data-ng-if=cellstubCtrl.object.description>{{cellstubCtrl.object.description}}</label>';
cellstub_html += '<div>';
cellstub_html += '<ul data-ng-if=cellstubCtrl.object.detail>';
cellstub_html += '<li data-ng-repeat="(key,value) in cellstubCtrl.object.detail"><span>{{key}}</span>:';
cellstub_html += '<button type=text data-ng-if=value.searchable data-ng-click=cellstubCtrl.Callback(value.callback)>{{value.label}}</button>';
cellstub_html += '<span data-ng-if=!value.searchable>{{value.label}}</span>';
cellstub_html += '</li>';
cellstub_html += '</ul>';
cellstub_html += '</div>';
cellstub_html += '</li>';
cellstub_html += '<li>';
cellstub_html += '<button data-ng-if=cellstubCtrl.button data-ng-click=cellstubCtrl.Callback(cellstubCtrl.object)>';
cellstub_html += '<ul>';
cellstub_html += '<li style="width:100%;">{{cellstubCtrl.button.label}}</li>';
cellstub_html += '<li><i class="material-icons" data-ng-if=cellstubCtrl.button.icon>{{cellstubCtrl.button.icon}}</i></li>';
cellstub_html += '</ul>';
cellstub_html += '</button>';
cellstub_html += '</li>';
cellstub_html += '</ul>';

var cellstub_css = '';
cellstub_css += '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
cellstub_css += '<style>';
cellstub_css += 'cellstub-component { position: relative; display: block; padding: 1rem 0; }';
cellstub_css += 'cellstub-component ul { display: table; margin: 0; padding: 0; }';
cellstub_css += 'cellstub-component ul li { display: table-cell; vertical-align: top; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(1) { width: 100%; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(1) > div > ul > li { font-size: .9em; padding-right: 1em; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(1) > div > ul > li > span { opacity: .7; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(1) label > b { padding: .1em 0; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(2) button { background-color: RGB(0,0,0); color: RGB(255,255,255); padding: .5rem 1rem; font-size: .9rem; font-family: inherit; opacity:.5; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(2) button:hover { opacity:1; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(2) button li { vertical-align: middle; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(2) button li:nth-child(1) { padding-right: .5rem; }';
cellstub_css += '</style>';

function CellStubComponentCtrl() {
  var cellstubCtrl = this;

  cellstubCtrl.$onInit = function() {
    if(!cellstubCtrl.icon) cellstubCtrl.icon = 'keyboard_arrow_right'; //default
  }

  cellstubCtrl.Callback = function(obj) {
    if(cellstubCtrl.callbackFn) cellstubCtrl.callbackFn({obj:obj});
  }
}
const cellstubComponent = {
  controller: CellStubComponentCtrl,
  controllerAs: 'cellstubCtrl',
  bindings: {
    callbackFn: '&?',
    search: '<?',
    icon: '<?',
    button: '<?',
    object: '<'
  },
  template: cellstub_css + cellstub_html
};
angular.module('app').component('cellstubComponent', cellstubComponent);
