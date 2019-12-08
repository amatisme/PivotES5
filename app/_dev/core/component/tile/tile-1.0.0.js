/** COMPONENT TILE - 1.0.0 *****************************************************/
var tile_html = '';
tile_html += '<button class="ui-stretch" type="tile" data-ng-click="tileCtrl.Callback(tileCtrl.labels.label)"">';
tile_html += '<ul class="ui-table">';
tile_html += '<li class="ui-vertical-top" data-ng-if=tileCtrl.icon><i class=material-icons>{{tileCtrl.icon}}</i></li>';
tile_html += '<li class="ui-vertical-top ui-padding-left ui-stretch ui-text-left">';
tile_html += '<label class="font-medium" data-ng-if=tileCtrl.labels.label>{{tileCtrl.labels.label}}</label>';
tile_html += '<label data-ng-if=tileCtrl.labels.detail data-ng-bind-html=tileCtrl.labels.detail></label>';
tile_html += '<label data-ng-if=tileCtrl.labels.description data-ng-bind-html=tileCtrl.labels.description></label>';
tile_html += '</li>';
tile_html += '</ul>';
tile_html += '</button>';

var tile_css = '';
tile_css += '<style>';
tile_css += 'tile-component { display: inline-block; position: relative; vertical-align: middle; width: 100%; }';
tile_css += 'tile-component button, tile-component button *, tile-component:hover { cursor: pointer; }';
tile_css += 'tile-component label:first-child { line-height: 135%; }';
tile_css += 'tile-component label:last-child { opacity: 0.8; }';
tile_css += '</style>';

function TileComponentCtrl()
{
  var tileCtrl = this;
  tileCtrl.Callback = function(obj) {
    if(tileCtrl.callbackFn) tileCtrl.callbackFn({obj:obj});
  }
}
const tileComponent = {
  controller: TileComponentCtrl,
  controllerAs: 'tileCtrl',
  bindings: {
    callbackFn: '&?',
    labels: '<',
    image: '<?',
    icon: '<?'
  },
  template: tile_css + tile_html
};

angular.module('app').component('tileComponent', tileComponent);
