/********************************************************************************
** COMPONENT - SELECTREADWRITE - 1.0.0 ******************************************
********************************************************************************/
var selectreadwrite_html = '';
selectreadwrite_html += '<fieldset>';
selectreadwrite_html += '<legend data-ng-if=selectreadwriteCtrl.label>{{selectreadwriteCtrl.label}}</legend>';
selectreadwrite_html += '<ul>';
selectreadwrite_html += '<li>';
selectreadwrite_html += '<select name=select-identity data-ng-model=selectreadwriteCtrl.object data-ng-required=selectreadwriteCtrl.required data-ng-options="each as each.label for each in selectreadwriteCtrl.options" data-ng-change=selectreadwriteCtrl.callback(selectreadwriteCtrl.object)>';
selectreadwrite_html += '<option value="">Please Select</option>';
selectreadwrite_html += '</select>';
selectreadwrite_html += '</li>';
selectreadwrite_html += '<li data-ng-if="selectreadwriteCtrl.required">';
selectreadwrite_html += '<i class="material-icons set" data-ng-if="selectreadwriteCtrl.object">done</i>';
selectreadwrite_html += '<i class="material-icons unset" data-ng-if="!selectreadwriteCtrl.object">error_outline</i>';
selectreadwrite_html += '</li>';
selectreadwrite_html += '</ul>';
selectreadwrite_html += '</fieldset>';

var selectreadwrite_css = '';
selectreadwrite_css += '<style type="text/css">';
selectreadwrite_css += 'selectreadwrite-component { display: block; position: relative; width: 100%; }';
selectreadwrite_css += 'selectreadwrite-component > fieldset > ul { display: table; width:100%; }';
selectreadwrite_css += 'selectreadwrite-component > fieldset > ul > li { display: table-cell; }';
selectreadwrite_css += 'selectreadwrite-component > fieldset > ul > li:first-child { width: 100%; }';
selectreadwrite_css += '</style>';

function selectreadwriteCtrl()
{
  var selectreadwriteCtrl = this;
  
  selectreadwriteCtrl.$onInit = function() {
    selectreadwriteCtrl.options = [
        { label: "Read", value: "read" },
        { label: "Write", value: "write" },
        { label: "Both", value: "readwrite" }
    ];
  }

  selectreadwriteCtrl.callback = function(obj) {
    if(selectreadwriteCtrl.callbackFn != undefined) selectreadwriteCtrl.callbackFn({obj:obj});
  }
}

const selectreadwriteComponent = {
  controller: selectreadwriteCtrl,
  controllerAs: 'selectreadwriteCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    disabled: '<?',
    required: '<',
    object: '='
  },
  template: selectreadwrite_css + selectreadwrite_html
};

angular.module('app').component('selectreadwriteComponent', selectreadwriteComponent);