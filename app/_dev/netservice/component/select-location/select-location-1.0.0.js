/** COMPONENT NETSERVICES SELECTLOCATION - 1.0.0 *******************************/
var selectlocation_html = '';
selectlocation_html += '<fieldset>';
selectlocation_html += '<legend data-ng-if=selectlocationCtrl.label>{{selectlocationCtrl.label}}</legend>';
selectlocation_html += '<ul>';
selectlocation_html += '<li>';
selectlocation_html += '<select name=select-businessunit data-ng-options="each as each.label for each in selectlocationCtrl.options" data-ng-model=selectlocationCtrl.object data-ng-required=selectlocationCtrl.required data-ng-disabled=selectlocationCtrl.disabled data-ng-change=selectlocationCtrl.Callback(selectlocationCtrl.object)>';
selectlocation_html += '<option value="">Please Select</option>';
selectlocation_html += '</select>';
selectlocation_html += '</li>';
selectlocation_html += '<li data-ng-if="selectlocationCtrl.required && !selectlocationCtrl.disabled">';
selectlocation_html += '<i class="material-icons set" data-ng-if="selectlocationCtrl.object">done</i>';
selectlocation_html += '<i class="material-icons unset" data-ng-if="!selectlocationCtrl.object">error_outline</i>';
selectlocation_html += '</li>';
selectlocation_html += '</ul>';
selectlocation_html += '</fieldset>';

var selectlocation_css = '';
selectlocation_css += '<style>';
selectlocation_css += 'selectlocation-component { display: block; position: relative; width: 100%; }';
selectlocation_css += 'selectlocation-component > fieldset > ul { display: table; width: 100%; }';
selectlocation_css += 'selectlocation-component > fieldset > ul > li { display: table-cell; }';
selectlocation_css += 'selectlocation-component > fieldset > ul > li:first-child { width: 100%; }';
selectlocation_css += '</style>';

function selectlocationComponentCtrl ($http)
{
  var selectlocationCtrl = this;

  selectlocationCtrl.$onInit = function() {
    $http.get('https://netservices.internal.ca/lib/TechnologyService.svc/json/kace/location').then(function(response) {
      selectlocationCtrl.options = response.data.AllKaceLocationsResult.map(item => {
        return { 
          label: item.NAME,
          value: item.NAME
        }
      }).sort();

      if(selectlocationCtrl.value) {
        selectlocationCtrl.object = selectlocationCtrl.options.filter(item => item.label == selectlocationCtrl.value)[0];
      }
    });
  }

  selectlocationCtrl.Callback = function(obj) {
    if(selectlocationCtrl.callbackFn != undefined) selectlocationCtrl.callbackFn({obj:obj});
  }
}
const selectlocationComponent = {
  controller: selectlocationComponentCtrl,
  controllerAs: 'selectlocationCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<?',
    disabled: '<?',
    value: "<?",
    required: '<'
  },
  template: selectlocation_css + selectlocation_html
};
angular.module('app').component('selectlocationComponent', selectlocationComponent);
