/********************************************************************************
** COMPONENT - SELECTBUSINESSUNIT - 1.0.0 ***************************************
********************************************************************************/
var selectbusinessunit_html = '';
selectbusinessunit_html += '<fieldset>';
selectbusinessunit_html += '<legend data-ng-if=selectbusinessunitCtrl.label>{{selectbusinessunitCtrl.label}}</legend>';
selectbusinessunit_html += '<ul>';
selectbusinessunit_html += '<li>';
selectbusinessunit_html += '<select name=select-businessunit data-ng-options="each as each.label for each in selectbusinessunitCtrl.options" data-ng-model=selectbusinessunitCtrl.object data-ng-required=selectbusinessunitCtrl.required data-ng-disabled=selectbusinessunitCtrl.disabled data-ng-change=selectbusinessunitCtrl.Callback(selectbusinessunitCtrl.object)>';
selectbusinessunit_html += '<option value="">Select</option>';
selectbusinessunit_html += '</select>';
selectbusinessunit_html += '</li>';
selectbusinessunit_html += '<li data-ng-if="selectbusinessunitCtrl.required && !selectbusinessunitCtrl.disabled">';
selectbusinessunit_html += '<i class="material-icons set" data-ng-if="selectbusinessunitCtrl.object">done</i>';
selectbusinessunit_html += '<i class="material-icons unset" data-ng-if="!selectbusinessunitCtrl.object">error_outline</i>';
selectbusinessunit_html += '</li>';
selectbusinessunit_html += '</ul>';
selectbusinessunit_html += '</fieldset>';

var selectbusinessunit_css = '';
selectbusinessunit_css += '<style>';
selectbusinessunit_css += 'selectbusinessunit-component { display: block; position: relative; }';
selectbusinessunit_css += 'selectbusinessunit-component > fieldset > ul { display: table; width:100%; }';
selectbusinessunit_css += 'selectbusinessunit-component > fieldset > ul > li { display: table-cell; }';
selectbusinessunit_css += 'selectbusinessunit-component > fieldset > ul > li:first-child { width: 100%; }';
selectbusinessunit_css += '</style>';

function SelectBusinessUnitComponentCtrl ($http)
{
  var selectbusinessunitCtrl = this;

  selectbusinessunitCtrl.$onInit = function() {
    selectbusinessunitCtrl.options = [];
    $http.get('https://netservices.internal.ca/lib/OrganizationService.svc/json/businessunit').then(function(response) {
      selectbusinessunitCtrl.options = response.data.AllWhitbyBusinessUnitsResult.map(item => {
        return {
          label: item.BusinessUnitDescription,
          value: item
        };
      }).sort();

      if(selectbusinessunitCtrl.value) {
        selectbusinessunitCtrl.object = selectbusinessunitCtrl.options.filter(item => item.label == selectbusinessunitCtrl.value)[0];
      }
    });
  }

  selectbusinessunitCtrl.Callback = function(obj) {
    if(selectbusinessunitCtrl.callbackFn != undefined) selectbusinessunitCtrl.callbackFn({obj:obj});
  }
}

const selectbusinessunitComponent = {
  controller: SelectBusinessUnitComponentCtrl,
  controllerAs: 'selectbusinessunitCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<?',
    disabled: '<?',
    value: "<?",
    required: '<'
  },
  template: selectbusinessunit_css + selectbusinessunit_html
};

angular.module('app').component('selectbusinessunitComponent', selectbusinessunitComponent);