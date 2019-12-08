/** COMPONENT CELLCARD - 1.0.0 *************************************************/
var cellcard_html = '';
cellcard_html += '<button data-ng-click=cellcardCtrl.Callback(cellcardCtrl.uri,cardCtrl.target)>';
cellcard_html += '<img src="../milib/assets/1x1.png" style="background-image: url(\'{{cellcardCtrl.image}}\'" />';
cellcard_html += '<div>';
cellcard_html += '<label>{{cellcardCtrl.label}}</label>';
cellcard_html += '<p>{{cellcardCtrl.detail}}</p>';
cellcard_html += '</div>';
cellcard_html += '<div><a href="{{cellcardCtrl.uri}}" target="{{cellcardCtrl.target}}">LEARN MORE</a></div>';
cellcard_html += '</button>';

var cellcard_css = '';
cellcard_css += '<style>';
cellcard_css += 'cellcard-component { position: relative; display: block; width: 100%; }';
cellcard_css += 'cellcard-component img { position: relative; display: block; width: 100%; height: 175px; border-style: solid; border-width: 6px !important; border-left: none !important; border-right: none !important; border-top: none !important; }';
cellcard_css += 'cellcard-component div { width: 100%; }';
cellcard_css += '</style>';

function CellCardComponentCtrl() {
  var cellcardCtrl = this;
  cellcardCtrl.$onInit = function() {}
  cellcardCtrl.callback = function(obj) {
    if(cellcardCtrl.callbackFn) cellcardCtrl.callbackFn({obj:obj});
  }
}
const cellcardComponent = {
  controller: CellCardComponentCtrl,
  controllerAs: 'cellcardCtrl',
  bindings: {
    callbackFn: '&',
    uri: '<',
    target: '<',
    label: '<',
    description: '<',
    image: '<'
  },
  template: cellcard_css + cellcard_html
};
angular.module('app').component('cellcardComponent', cellcardComponent);
