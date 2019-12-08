/** COMPONENT CELLPARAM - 1.0.0 ************************************************/
var cellparam_html = '';
cellparam_html += '<ul data-ng-repeat="(key,value) in cellparamCtrl.object" data-ng-if="key!=\'token\'">';
cellparam_html += '<li data-ng-if="!cellparamCtrl.isArray(value)">';
cellparam_html += '<b>{{key}}:</b> {{value}}';
cellparam_html += '</li>';
cellparam_html += '<li data-ng-if="cellparamCtrl.isArray(value)">';
cellparam_html += '<span>{{key}}:</span><br>';
cellparam_html += '<span data-ng-repeat="each in value">{{each}}</br></span>';
cellparam_html += '</li>';
cellparam_html += '</ul>';

var cellparam_css = '';

function CellParamComponentCtrl()
{
  var itemCtrl = this;
  itemCtrl.$onInit = function() {}
  itemCtrl.isArray  = function(arg) {
    return Array.isArray(arg);
  }
}
const cellparamComponent = {
  controller: CellParamComponentCtrl,
  controllerAs: 'cellparamCtrl',
  bindings: {
    callbackFn: '&?',
    object: '<'
  },
  template: cellparam_css + cellparam_html
};
angular.module('app').component('cellparamComponent', cellparamComponent);
