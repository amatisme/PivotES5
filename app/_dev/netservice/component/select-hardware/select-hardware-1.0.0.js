/** COMPONENT NETSERVICES SELECTHARDWARE - 1.0.0 *******************************/
var selecthardware_html = '';
selecthardware_html += '<fieldset>';
selecthardware_html += '<legend data-ng-if=selecthardwareCtrl.label>{{selecthardwareCtrl.label}}</legend>';
selecthardware_html += '<ul>';
selecthardware_html += '<li>';
selecthardware_html += '<input type=hidden data-ng-model=selecthardwareCtrl.object data-ng-required=selecthardwareCtrl.required />';
selecthardware_html += '<select name=select-software data-ng-model=selecthardwareCtrl.hardware data-ng-options="each as each.label for each in selecthardwareCtrl.options" data-ng-change=selecthardwareCtrl.SetObject()>';
selecthardware_html += '<option value="">Select Hardware</option>';
selecthardware_html += '</select>';
selecthardware_html += '</li>';
selecthardware_html += '<li width=1% data-ng-if="selecthardwareCtrl.required && !selecthardwareCtrl.disabled">';
selecthardware_html += '<span data-ng-if=selecthardwareCtrl.multiple>';
selecthardware_html += '<i class="material-icons set" data-ng-if="selecthardwareCtrl.object">done</i>';
selecthardware_html += '<i class="material-icons unset" data-ng-if="!selecthardwareCtrl.object">error_outline</i>';
selecthardware_html += '</span>';
selecthardware_html += '<span data-ng-if=!selecthardwareCtrl.multiple>';
selecthardware_html += '<i class="material-icons set" data-ng-if="selecthardwareCtrl.object">done</i>';
selecthardware_html += '<i class="material-icons unset" data-ng-if="!selecthardwareCtrl.object">error_outline</i>';
selecthardware_html += '</span>';
selecthardware_html += '</li>';
selecthardware_html += '</ul>';
selecthardware_html += '<div data-ng-if=selecthardwareCtrl.object>';
selecthardware_html += '<ul class=item data-ng-repeat="each in selecthardwareCtrl.object">';
selecthardware_html += '<li><span><nobr>{{each.label}}</nobr></span></li>';
selecthardware_html += '<li><button type=button data-ng-click=selecthardwareCtrl.RemoveObject(each)>Remove</button></li>';
selecthardware_html += '</ul>';
selecthardware_html += '</div>';
selecthardware_html += '</fieldset>';

var selecthardware_css = '';
selecthardware_css += '<style>';
selecthardware_css += 'selecthardware-component { display: block; position: relative; }';
selecthardware_css += 'selecthardware-component > fieldset > ul { display: table; width: 100%; }';
selecthardware_css += 'selecthardware-component > fieldset > ul > li { display: table-cell; }';
selecthardware_css += 'selecthardware-component > fieldset > ul > li:first-child { width: 100%; }';
selecthardware_css += 'selecthardware-component > fieldset > ul > li:last-child { width: 1%; }';
selecthardware_css += 'selecthardware-component > fieldset > div { padding: .5rem 1rem; }';
selecthardware_css += 'selecthardware-component > fieldset > div > ul > li { display: table-cell; }';
selecthardware_css += 'selecthardware-component > fieldset > div > ul > li:last-child { width: 100%; padding-left: 1rem; text-align: right; }';
selecthardware_css += '</style>';

function selecthardwareCtrl($http)
{
  var selecthardwareCtrl = this;
  
  selecthardwareCtrl.$onInit = function() {
    var uri = 'https://netservices.internal.ca/lib/intakeservice.svc/json/clienthardware';
    $http.get(uri).then(function(response) {
      selecthardwareCtrl.options = response.data.map(item => {
        return {
          label: item.HardwareDescription,
          value: item
        };
      });
      selecthardwareCtrl.options.sort();
    });
  }

  selecthardwareCtrl.SetObject = function() {
    if(!selecthardwareCtrl.multiple) {
      selecthardwareCtrl.object = selecthardwareCtrl.hardware;
      selecthardwareCtrl.callback();
    } else {
      //remove item from options
      selecthardwareCtrl.options = selecthardwareCtrl.options.filter(item => item !== selecthardwareCtrl.hardware).sort();
      //add item to object
      selecthardwareCtrl.AddObject();
      selecthardwareCtrl.callback();
    }
  }

  selecthardwareCtrl.AddObject = function() {
    if(!selecthardwareCtrl.items) selecthardwareCtrl.items = [];
    selecthardwareCtrl.items.push(selecthardwareCtrl.hardware);
    selecthardwareCtrl.hardware = undefined;
    selecthardwareCtrl.object = selecthardwareCtrl.items;
  }

  selecthardwareCtrl.RemoveObject = function(obj) {
    //Adding item back to options
    selecthardwareCtrl.options.push(obj);
    //removing item from object
    selecthardwareCtrl.items = selecthardwareCtrl.items.filter(item => item !== obj);
    if(selecthardwareCtrl.items.length != 0) {
      selecthardwareCtrl.object = selecthardwareCtrl.items;
    } else {
      selecthardwareCtrl.items = undefined;
      selecthardwareCtrl.object = undefined;
    }
    selecthardwareCtrl.callback();
  }
  
  selecthardwareCtrl.callback = function() {
    if(selecthardwareCtrl.callbackFn != undefined) selecthardwareCtrl.callbackFn({obj:selecthardwareCtrl.object.value});
  }
}
const selecthardwareComponent = {
  controller: selecthardwareCtrl,
  controllerAs: 'selecthardwareCtrl',
  bindings: {
    callbackFn: '&?',
    object: '=',
    label: '<',
    required: '<?',
    disabled: '<?',
    multiple: '<?'
  },
  template: selecthardware_css + selecthardware_html
};
angular.module('app').component('selecthardwareComponent', selecthardwareComponent);