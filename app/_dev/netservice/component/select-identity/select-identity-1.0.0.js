/** COMPONENT NETSERVICES SELECTIDENTITY - 1.0.0 *******************************/
var selectidentity_html = '';
selectidentity_html += '<fieldset>';
selectidentity_html += '<legend data-ng-if=selectidentityCtrl.label>{{selectidentityCtrl.label}}</legend>';
selectidentity_html += '<ul>';
selectidentity_html += '<li>';
selectidentity_html += '<select name=select-identity data-ng-model=selectidentityCtrl.object data-ng-required=selectidentityCtrl.required data-ng-options="each as each.label for each in selectidentityCtrl.options" data-ng-change=selectidentityCtrl.callback(selectidentityCtrl.object)>';
selectidentity_html += '<option value="">Please Select</option>';
selectidentity_html += '</select>';
selectidentity_html += '</li>';
selectidentity_html += '<li data-ng-if="selectidentityCtrl.required">';
selectidentity_html += '<i class="material-icons set" data-ng-if="selectidentityCtrl.object">done</i>';
selectidentity_html += '<i class="material-icons unset" data-ng-if="!selectidentityCtrl.object">error_outline</i>';
selectidentity_html += '</li>';
selectidentity_html += '</ul>';
selectidentity_html += '</fieldset>';

var selectidentity_css = '';
selectidentity_css += '<style type="text/css">';
selectidentity_css += 'selectidentity-component { display: block; position: relative; width: 100%; }';
selectidentity_css += 'selectidentity-component > fieldset > ul { display: table; width:100%; }';
selectidentity_css += 'selectidentity-component > fieldset > ul > li { display: table-cell; }';
selectidentity_css += 'selectidentity-component > fieldset > ul > li:first-child { width: 100%; }';
selectidentity_css += '</style>';

function selectidentityCtrl($http)
{
  var selectidentityCtrl = this;
  
  selectidentityCtrl.$onInit = function() {
    const uri = 'https://netservices.internal.ca/lib/intakeservice.svc/json/identity';
    $http.get(uri).then(function(resp) { 
      selectidentityCtrl.options = resp.data.map(item => {
        return {
          label: item.FullName,
          value: item
        };
      }).sort();
    });
  }

  selectidentityCtrl.callback = function(obj) {
    if(selectidentityCtrl.callbackFn != undefined) selectidentityCtrl.callbackFn({obj:obj});
  }
}
const selectidentityComponent = {
  controller: selectidentityCtrl,
  controllerAs: 'selectidentityCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    disabled: '<?',
    required: '<',
    object: '='
  },
  template: selectidentity_css + selectidentity_html
};
angular.module('app').component('selectidentityComponent', selectidentityComponent);