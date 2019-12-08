/** COMPONENT CELLEMPLOYEE - 1.0.0 *********************************************/
var cellemployee_html = '';
cellemployee_html += '<ul class="ui-table" responsive-block>';
cellemployee_html += '<li class="ui-vertical-top ui-wrap-none" responsive-block>';
cellemployee_html += '<button class="ui-cover ui-padding-right ui-padding-left" data-ng-click=cellemployeeCtrl.Callback({obj:obj}) style="background-image:url(\'/milib/v/1.2/components/cell-employee/nophoto.png\')">';
cellemployee_html += '<img data-ng-src="/milib/v/1.2/assets/1x1.png"/>';
cellemployee_html += '</button><br />';
cellemployee_html += '<emlabel-component class="font-large" searchterm=cellemployeeCtrl.search label=cellemployeeCtrl.object.name></emlabel-component><br/>';
cellemployee_html += '<ul class="ui-table ui-padding-small-top ui-padding-small-bottom">';
cellemployee_html += '<li class="ui-padding-right"><i class="material-icons">email</i></li>';
cellemployee_html += '<li class="ui-stretch">';
cellemployee_html += '<a href="mailto:{{cellemployeeCtrl.object.email}}" data-ng-if=cellemployeeCtrl.object.email>';
cellemployee_html += '<emlabel-component searchterm=cellemployeeCtrl.search label=cellemployeeCtrl.object.email></emlabel-component>';
cellemployee_html += '</a>';
cellemployee_html += '<span data-ng-if=!cellemployeeCtrl.object.email>n/a</span>';
cellemployee_html += '</li>';
cellemployee_html += '</ul>';
cellemployee_html += '</li>';
cellemployee_html += '<li class="ui-cell-space-small" responsive-block></li>';
cellemployee_html += '<li class="ui-vertical-top ui-stretch" responsive-block>';
cellemployee_html += '<ul class="ui-table ui-padding-small-bottom" data-ng-repeat="each in cellemployeeCtrl.labels">';
cellemployee_html += '<li responsive-block label><label class="font-dim ui-wrap-none">{{each.label}}</label></li>';
cellemployee_html += '<li class="ui-stretch" responsive-block><emlabel-component searchterm=cellemployeeCtrl.search label=each.value></emlabel-component></li>';
cellemployee_html += '<li data-ng-if=each.searchable><button type="icon" data-ng-click=cellemployeeCtrl.SetQuery(each.value)><i class="material-icons">search</i></button></li>';
cellemployee_html += '</ul>';
cellemployee_html += '</li>';
cellemployee_html += '</ul>';

var cellemployee_css = '';
cellemployee_css += '<style>';
cellemployee_css += 'cellemployee-component { position: relative; display: block; }';
cellemployee_css += 'cellemployee-component > ul > li:first-child > button { width: 66px; height: 66px; }';
cellemployee_css += 'cellemployee-component > ul > li:first-child { width: 1%; }';
cellemployee_css += 'cellemployee-component > ul > li:last-child { width: 60%; }';
cellemployee_css += 'cellemployee-component [label] { width: 30%; }';
cellemployee_css += '</style>';

function CellEmployeeComponentCtrl($http) {
  var cellemployeeCtrl = this;
  cellemployeeCtrl.$onInit = function() {
    var na = 'n/a';
    var email = (cellemployeeCtrl.object.email ?  cellemployeeCtrl.object.email : na);
    var tel = (cellemployeeCtrl.object.tel ?  cellemployeeCtrl.object.tel : na);
    var cel = (cellemployeeCtrl.object.cel ?  cellemployeeCtrl.object.cel : na);
    var position = (cellemployeeCtrl.object.position ?  cellemployeeCtrl.object.position : na);
    var location = (cellemployeeCtrl.object.location ?  cellemployeeCtrl.object.location : na);
    var unit = (cellemployeeCtrl.object.business_unit ?  cellemployeeCtrl.object.business_unit : na);
    cellemployeeCtrl.labels = [
      {label:"Tel", value:cellemployeeCtrl.object.tel,searchable:null},
      {label:"Cell", value:cellemployeeCtrl.object.cel,searchable:null},
      {label:"Position", value:cellemployeeCtrl.object.position,searchable:true},
      {label:"Business Unit", value:cellemployeeCtrl.object.business_unit,searchable:true},
      {label:"Location", value:cellemployeeCtrl.object.location,searchable:true}
    ];
  }

  cellemployeeCtrl.SetQuery = function(obj) {
    if(!cellemployeeCtrl.search) cellemployeeCtrl.search = { value: {$:""} };
    cellemployeeCtrl.search.value.$ = obj;
  }

  cellemployeeCtrl.Callback = function(obj) {
    cellemployeeCtrl.callbackFn({obj:obj});
  }
}
const cellemployeeComponent = {
  controller: CellEmployeeComponentCtrl,
  controllerAs: 'cellemployeeCtrl',
  bindings: {
    callbackFn: '&',
    object: '<',
    search: '=?'
  },
  template: cellemployee_css + cellemployee_html
};
angular.module('app').component('cellemployeeComponent', cellemployeeComponent);
