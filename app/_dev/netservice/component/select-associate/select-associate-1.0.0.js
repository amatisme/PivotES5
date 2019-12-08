/** COMPONENT NETSERVICES SELECTASSOCIATE - 1.0.0 ******************************/
var selectassociate_html = '';
selectassociate_html += '<fieldset>';
selectassociate_html += '<legend data-ng-if=selectassociateCtrl.label>{{selectassociateCtrl.label}}</legend>';
selectassociate_html += '<ul>';
selectassociate_html += '<li>';
selectassociate_html += '<select name=select-associate data-ng-model=selectassociateCtrl.object data-ng-required=selectassociateCtrl.required data-ng-options="each as each.FullName for each in selectassociateCtrl.objects" data-ng-change=selectassociateCtrl.callback(selectassociateCtrl.object)>';
selectassociate_html += '<option value="">Please Select</option>';
selectassociate_html += '</select>';
selectassociate_html += '</li>';
selectassociate_html += '<li data-ng-if="selectassociateCtrl.required">';
selectassociate_html += '<i class="material-icons set" data-ng-if="selectassociateCtrl.object">done</i>';
selectassociate_html += '<i class="material-icons unset" data-ng-if="!selectassociateCtrl.object">error_outline</i>';
selectassociate_html += '</li>';
selectassociate_html += '</ul>';
selectassociate_html += '</fieldset>';

var selectassociate_css = '';
selectassociate_css += '<style type="text/css">';
selectassociate_css += 'selectassociate-component { display: block; position: relative; width: 100%; }';
selectassociate_css += 'selectassociate-component > fieldset > ul { display: table; width:100%; }';
selectassociate_css += 'selectassociate-component > fieldset > ul > li { display: table-cell; }';
selectassociate_css += 'selectassociate-component > fieldset > ul > li:first-child { width: 100%; }';
selectassociate_css += '</style>';

function selectassociateCtrl($http)
{
  var selectassociateCtrl = this;

  selectassociateCtrl.$onInit = function() {
    var uri = 'https://netservices.internal.ca/lib/EmployeeService.svc/json/employee';

    //methods include union,nonunion,management
    if(selectassociateCtrl.method) {
      $http.get(uri + '/' + selectassociateCtrl.method).then(function(response) { selectassociateCtrl.objects = response.data; });
    } else {
      $http.get(uri).then(function(response) { selectassociateCtrl.objects = response.data.ActiveEmployeesResult; });
    }
  }

  selectassociateCtrl.callback = function(obj) {
    if(selectassociateCtrl.callbackFn != undefined) selectassociateCtrl.callbackFn({obj:obj});
  }
}
const selectassociateComponent = {
  controller: selectassociateCtrl,
  controllerAs: 'selectassociateCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    disabled: '<?',
    required: '<',
    method: '<?',
    object: '='
  },
  template: selectassociate_css + selectassociate_html
};
angular.module('app').component('selectassociateComponent', selectassociateComponent);