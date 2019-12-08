/** COMPONENT SELECTEMPLOYEE - 1.0.0 ***************************************************/
var selectemployee_html = '';
selectemployee_html += '<fieldset>';
selectemployee_html += '<legend data-ng-if=selectemployeeCtrl.label>{{selectemployeeCtrl.label}}</legend>';
selectemployee_html += '<ul>';
selectemployee_html += '<li>';
selectemployee_html += '<select name=selectemployee data-ng-model=selectemployeeCtrl.object data-ng-required=selectemployeeCtrl.required data-ng-disabled=selectemployeeCtrl.disabled data-ng-change=selectemployeeCtrl.Callback(selectemployeeCtrl.object)>';
selectemployee_html += '<option value="">Select</option>';
selectemployee_html += '<option value="{{each}}" data-ng-selected="{{each == selectemployeeCtrl.object}}" data-ng-repeat="each in selectemployeeCtrl.options">{{each.FullName}}</option>';
selectemployee_html += '</select>';
selectemployee_html += '</li>';
selectemployee_html += '<li data-ng-if="selectemployeeCtrl.required && !selectemployeeCtrl.disabled">';
selectemployee_html += '<i class="material-icons set" data-ng-if="selectemployeeCtrl.object">done</i>';
selectemployee_html += '<i class="material-icons unset" data-ng-if="!selectemployeeCtrl.object">error_outline</i>';
selectemployee_html += '</li>';
selectemployee_html += '</ul>';
selectemployee_html += '</fieldset>';

var selectemployee_css = '';
selectemployee_css += '<style>';
selectemployee_css += 'selectemployee-component { display: block; position: relative; }';
selectemployee_css += 'selectemployee-component > ul { display: table; width: 100%; }';
selectemployee_css += 'selectemployee-component > ul > li { display: table-cell; }';
selectemployee_css += 'selectemployee-component > ul > li:first-child { width: 100%; }';
selectemployee_css += '</style>';

function SelectEmployeeCtrl($http,selectCtrl)
{
  var selectemployeeCtrl = this;
  //PROTOCOL METHODS FOR FORMS
  selectemployeeCtrl.$onInit = function() {
    $http.get('https://netservices.internal.ca/lib/EmployeeService.svc/json/employee').then(function(response) {
      selectemployeeCtrl.options = response.data.ActiveEmployeesResult;
    });
    console.log(selectCtrl);
  }

  selectemployeeCtrl.Callback = function(obj) {
    if(selectemployeeCtrl.callbackFn != undefined) selectemployeeCtrl.callbackFn({obj:obj});
  }
}
const selectemployeeComponent = {
  controller: SelectEmployeeCtrl,
  controllerAs: 'selectemployeeCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<?',
    disabled: '<?',
    required: '<'
  },
  template: selectemployee_css + selectemployee_html
};
angular.module('app').component('selectemployeeComponent', selectemployeeComponent);
