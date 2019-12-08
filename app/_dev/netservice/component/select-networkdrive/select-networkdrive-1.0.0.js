/** COMPONENT NETSERVICES- SELECTNETWORKDRIVE - 1.0.0 **************************/
var selectnetworkdrive_html = '';
selectnetworkdrive_html += '<fieldset>';
selectnetworkdrive_html += '<legend data-ng-if=selectnetworkdriveCtrl.label>{{selectnetworkdriveCtrl.label}}</legend>';
selectnetworkdrive_html += '<ul>';
selectnetworkdrive_html += '<li>';
selectnetworkdrive_html += '<select name=select-identity data-ng-model=selectnetworkdriveCtrl.object data-ng-required=selectnetworkdriveCtrl.required data-ng-options="each as each.label for each in selectnetworkdriveCtrl.options" data-ng-change=selectnetworkdriveCtrl.callback(selectnetworkdriveCtrl.object)>';
selectnetworkdrive_html += '<option value="">Please Select</option>';
selectnetworkdrive_html += '</select>';
selectnetworkdrive_html += '</li>';
selectnetworkdrive_html += '<li data-ng-if="selectnetworkdriveCtrl.required">';
selectnetworkdrive_html += '<i class="material-icons set" data-ng-if="selectnetworkdriveCtrl.object">done</i>';
selectnetworkdrive_html += '<i class="material-icons unset" data-ng-if="!selectnetworkdriveCtrl.object">error_outline</i>';
selectnetworkdrive_html += '</li>';
selectnetworkdrive_html += '</ul>';
selectnetworkdrive_html += '</fieldset>';

var selectnetworkdrive_css = '';
selectnetworkdrive_css += '<style type="text/css">';
selectnetworkdrive_css += 'selectnetworkdrive-component { display: block; position: relative; width: 100%; }';
selectnetworkdrive_css += 'selectnetworkdrive-component > fieldset > ul { display: table; width:100%; }';
selectnetworkdrive_css += 'selectnetworkdrive-component > fieldset > ul > li { display: table-cell; }';
selectnetworkdrive_css += 'selectnetworkdrive-component > fieldset > ul > li:first-child { width: 100%; }';
selectnetworkdrive_css += '</style>';

function selectnetworkdriveCtrl($http)
{
  var selectnetworkdriveCtrl = this;
  
  selectnetworkdriveCtrl.$onInit = function() {
    const uri = 'https://netservices.internal.ca/lib/intakeservice.svc/json/networkdrive';
    $http.get(uri).then(function(resp) { 
      console.log(resp);
      selectnetworkdriveCtrl.options = resp.data.map(item => {
        return {
          label: item.NetworkDriveDescription,
          value: item
        };
      }).sort();
    });
  }

  selectnetworkdriveCtrl.callback = function(obj) {
    if(selectnetworkdriveCtrl.callbackFn != undefined) selectnetworkdriveCtrl.callbackFn({obj:obj});
  }
}
const selectnetworkdriveComponent = {
  controller: selectnetworkdriveCtrl,
  controllerAs: 'selectnetworkdriveCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    disabled: '<?',
    required: '<',
    object: '='
  },
  template: selectnetworkdrive_css + selectnetworkdrive_html
};
angular.module('app').component('selectnetworkdriveComponent', selectnetworkdriveComponent);