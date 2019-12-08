/** COMPONENT BLOCK - 1.0.0 **************************************************/
var block_html = '';
block_html += '<ul>';
block_html += '<li><span>{{blockCtrl.label}}</span></li>';
block_html += '<li>';
block_html += '<i class="material-icons" data-ng-if=blockCtrl.icon>{{blockCtrl.icon}}</i>';
block_html += '</li>';
block_html += '</ul>';
block_html += '<div data-ng-bind-html=blockCtrl.html></div>';

var block_css = '';
block_css += '<style>';
block_css += 'block-component { display: block; position: relative; }';
block_css += 'block-component * { margin: 0; padding: 0; }';
block_css += 'block-component > ul { display: table; }';
block_css += 'block-component > ul > li { display: table-cell; }';
block_css += 'block-component > ul > li:first-child { width: 100%; }';
block_css += 'block-component > ul > li:first-child > span { font-size: 1.1rem; margin-bottom: .3rem; vertical-align: middle; }';
block_css += 'block-component > ul > li:last-child { width: 1%; }';
block_css += '</style>';

function BlockComponentCtrl() {
  var blockCtrl = this;

  blockCtrl.Callback = function(index,obj) {
    blockCtrl.callbackFn({obj:obj});
  }
}
const blockComponent = {
  controller: BlockComponentCtrl,
  controllerAs: 'blockCtrl',
  bindings: {
    callbackFn: '&',
    icon: '<?',
    label: '<',
    html: '<'
  },
  template: block_css + block_html
};
angular.module('app').component('blockComponent', blockComponent);