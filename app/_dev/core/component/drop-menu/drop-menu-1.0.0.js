/** COMPONENT DROPMENU - 1.0.0 *************************************************/
var dropmenu_html = '';
dropmenu_html += '<div data-ng-mouseleave=dropmenuCtrl.hoverOut()>';
dropmenu_html += '<ul>';
dropmenu_html += '<li data-ng-repeat="each in dropmenuCtrl.objects">';
dropmenu_html += '<button data-ng-mouseover="dropmenuCtrl.hoverIn($index);" data-ng-click=dropmenuCtrl.Callback(each) data-ng-class="{active: $index == dropmenuCtrl.index}">';
dropmenu_html += '<ul>';
dropmenu_html += '<li>';
dropmenu_html += '{{each.label}}';
dropmenu_html += '</li>';
dropmenu_html += '<li>';
dropmenu_html += '<i class="material-icons" data-ng-if="dropmenuCtrl.index!=$index && dropmenuCtrl.objects[$index]">keyboard_arrow_down</i>';
dropmenu_html += '<i class="material-icons" data-ng-if="dropmenuCtrl.index==$index && dropmenuCtrl.objects[$index]">keyboard_arrow_up</i>';
dropmenu_html += '</li>';
dropmenu_html += '</ul>';
dropmenu_html += '</button>';
dropmenu_html += '</li>';
dropmenu_html += '</ul>';
dropmenu_html += '<div data-ng-show="dropmenuCtrl.index==$index" data-ng-mouseleave=dropmenuCtrl.hoverOut() data-ng-repeat="each in dropmenuCtrl.objects" data-ng-class="dropmenuCtrl.index==$index ? \'fadein\' : \'fadeout\'">';
dropmenu_html += '<button title={{link.detail}} data-ng-click=dropmenuCtrl.Callback(link) data-ng-repeat="link in each.links">';
dropmenu_html += '{{link.label}}';
dropmenu_html += '</button>';
dropmenu_html += '</div>';
dropmenu_html += '</div>';

var dropmenu_css = '';
dropmenu_css += '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
dropmenu_css += '<style>';
dropmenu_css += 'dropmenu-component { display: inline-block; position: relative; min-width: 120px;}';
dropmenu_css += 'dropmenu-component * { background-color: transparent; border: none; padding:0; margin:0; }';
dropmenu_css += 'dropmenu-component ul { display:table; width: 100%;}';
dropmenu_css += 'dropmenu-component ul li { display:table-cell; vertical-align: top;}';
dropmenu_css += 'dropmenu-component > div > ul > li > button { padding: 18px; white-space: nowrap; height:60px; width:100%;}';
dropmenu_css += 'dropmenu-component > div > ul > li > button.active { background-color:RGB(55,55,55) !important; }';
dropmenu_css += 'dropmenu-component > div > ul > li > button > ul > li:first-child { width: 100%;}';
dropmenu_css += 'dropmenu-component > div > div { display:none; flex-direction: column; flex-wrap: wrap; position: absolute; top:60px; left:0; z-index:99; width: 100%; background-color:RGB(255,255,255);}';
dropmenu_css += 'dropmenu-component > div > div.fadein { animation: fadein .5s; animation-fill-mode: forwards; }';
dropmenu_css += 'dropmenu-component > div > div.fadeout { animation: fadeout .5s; }';
dropmenu_css += 'dropmenu-component > div > div > button { height: 60px; margin: 0 3px; padding: 18px; color: RGB(0,0,0);}';
dropmenu_css += '/* ANIMATE */';
dropmenu_css += '@keyframes fadein {';
dropmenu_css += 'from { opacity: 0; display: flex; } to { opacity: 1; }';
dropmenu_css += '}';
dropmenu_css += '@keyframes fadeout {';
dropmenu_css += 'from { opacity: 1; } to { opacity: 0; display: none; }';
dropmenu_css += '}';
dropmenu_css += '/* RESPONSIVE */';
dropmenu_css += '@media only screen and (max-width: 414px) {';
dropmenu_css += 'dropmenu-component > button { width: 100%; }';
dropmenu_css += '}';
dropmenu_css += '</style>';

function DropMenuComponentCtrl() {
  var dropmenuCtrl = this;

  dropmenuCtrl.$onInit = function() {
  }

  dropmenuCtrl.hoverIn = function(index){
    dropmenuCtrl.hover = true;
    dropmenuCtrl.index = index;
  };

  dropmenuCtrl.hoverOut = function(){
    dropmenuCtrl.hover = undefined;
    dropmenuCtrl.index = undefined;
  };

  dropmenuCtrl.Callback = function(obj) {
    if(dropmenuCtrl.callbackFn) dropmenuCtrl.callbackFn({obj:obj});
  }
}
const dropmenuComponent = {
  controller: DropMenuComponentCtrl,
  controllerAs: 'dropmenuCtrl',
  bindings: {
    callbackFn: '&?',
    labels: '<',
    objects: '<?'
  },
  template: dropmenu_css + dropmenu_html
};
angular.module('app').component('dropmenuComponent', dropmenuComponent);
