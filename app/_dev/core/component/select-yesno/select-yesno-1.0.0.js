/********************************************************************************
** COMPONENT - SELECTYESNO - 1.0.0 **********************************************
********************************************************************************/
var selectyesno_html = '';
selectyesno_html += '<fieldset>';
selectyesno_html += '<legend data-ng-if=selectyesnoCtrl.label>{{selectyesnoCtrl.label}}</legend>';
selectyesno_html += '<ul>';
selectyesno_html += '<li>';
selectyesno_html += '<select name=select-identity data-ng-model=selectyesnoCtrl.object data-ng-required=selectyesnoCtrl.required data-ng-options="each as each.label for each in selectyesnoCtrl.options" data-ng-change=selectyesnoCtrl.callback(selectyesnoCtrl.object)>';
selectyesno_html += '<option value="">Please Select</option>';
selectyesno_html += '</select>';
selectyesno_html += '</li>';
selectyesno_html += '<li data-ng-if="selectyesnoCtrl.required">';
selectyesno_html += '<i class="material-icons set" data-ng-if="selectyesnoCtrl.object">done</i>';
selectyesno_html += '<i class="material-icons unset" data-ng-if="!selectyesnoCtrl.object">error_outline</i>';
selectyesno_html += '</li>';
selectyesno_html += '</ul>';
selectyesno_html += '</fieldset>';

var selectyesno_css = '';
selectyesno_css += '<style type="text/css">';
selectyesno_css += 'selectyesno-component { display: block; position: relative; width: 100%; }';
selectyesno_css += 'selectyesno-component > fieldset > ul { display: table; width:100%; }';
selectyesno_css += 'selectyesno-component > fieldset > ul > li { display: table-cell; }';
selectyesno_css += 'selectyesno-component > fieldset > ul > li:first-child { width: 100%; }';
selectyesno_css += '</style>';

function selectyesnoCtrl()
{
  var selectyesnoCtrl = this;
  
  selectyesnoCtrl.$onInit = function() {
    selectyesnoCtrl.options = [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
    ];
  }

  selectyesnoCtrl.callback = function(obj) {
    if(selectyesnoCtrl.callbackFn != undefined) selectyesnoCtrl.callbackFn({obj:obj});
  }
}

const selectyesnoComponent = {
  controller: selectyesnoCtrl,
  controllerAs: 'selectyesnoCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    disabled: '<?',
    required: '<',
    object: '='
  },
  template: selectyesno_css + selectyesno_html
};

angular.module('app').component('selectyesnoComponent', selectyesnoComponent);