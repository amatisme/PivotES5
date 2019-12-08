/********************************************************************************
** COMPONENT - SELECT - 1.0.0 ***************************************************
********************************************************************************/
var select_html = '';
select_html += '<fieldset>';
select_html += '<legend data-ng-if=selectCtrl.label>{{selectCtrl.label}}</legend>';
select_html += '<ul>';
select_html += '<li style="width:1%;" data-ng-if="selectCtrl.icon">';
select_html += '<i class="material-icons">{{selectCtrl.icon}}</i>';
select_html += '</li>';
select_html += '<li>';
select_html += '<select name=object data-ng-model=selectCtrl.object data-ng-options="each as each.label for each in selectCtrl.options" data-ng-change=selectCtrl.callback(selectCtrl.object) data-ng-required=selectCtrl.required>';
select_html += '<option value="">Please Select</option>';
select_html += '</select>';
select_html += '</li>';
select_html += '<li data-ng-if="selectCtrl.required">';
select_html += '<i class="material-icons unset" data-ng-if="!selectCtrl.object">error_outline</i>';
select_html += '<i class="material-icons set" data-ng-if=selectCtrl.object>done</i>';
select_html += '</li>';
select_html += '</ul>';
select_html += '</fieldset>';

var select_css = '';
select_css += '<style>';
select_css += 'select-component { display: block; position: relative; }';
select_css += 'select-component > fieldset > ul { display: table; width: 100%; }';
select_css += 'select-component > fieldset > ul > li { display: table-cell; }';
select_css += 'select-component > fieldset > ul > li:first-child { width: 100%; }';
select_css += '</style>';

function SelectComponentCtrl()
{
  var selectCtrl = this;

  selectCtrl.callback = function(obj) {
    if(selectCtrl.callbackFn != undefined) selectCtrl.callbackFn({obj:obj});
  }

  selectCtrl.Validate = function(arg) {
    return (selectCtrl.object ? true : false);
  }
}

const selectComponent = {
  controller: SelectComponentCtrl,
  controllerAs: 'selectCtrl',
  bindings: {
    callbackFn: '&?',
    object: '=',
    label: '<',
    options: '<',
    sublabel: '<?',
    disabled: '<?',
    required: '<?',
    icon: '<?'
  },
  template: select_css + select_html
};

angular.module('app').component('selectComponent', selectComponent);
