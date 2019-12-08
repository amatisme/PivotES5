/** COMPONENT NETSERVICES SELECTSOFTWARE - 1.0.0 *******************************/
var selectsoftware_html = '';
selectsoftware_html += '<fieldset>';
selectsoftware_html += '<legend data-ng-if=selectsoftwareCtrl.label>{{selectsoftwareCtrl.label}}</legend>';
selectsoftware_html += '<ul>';
selectsoftware_html += '<li>';
selectsoftware_html += '<input type=hidden data-ng-model=selectsoftwareCtrl.object data-ng-required=selectsoftwareCtrl.required />';
selectsoftware_html += '<select name=select-software data-ng-model=selectsoftwareCtrl.software data-ng-options="each as each.label for each in selectsoftwareCtrl.options.software" data-ng-change=selectsoftwareCtrl.SetSoftware()>';
selectsoftware_html += '<option value="">Please Select</option>';
selectsoftware_html += '</select>';
selectsoftware_html += '<select data-ng-if="selectsoftwareCtrl.software && selectsoftwareCtrl.options.roles" name=select-software-role data-ng-model=selectsoftwareCtrl.role data-ng-required=selectsoftwareCtrl.required data-ng-options="each as each.label for each in selectsoftwareCtrl.options.roles" data-ng-change=selectsoftwareCtrl.AddObject()>';
selectsoftware_html += '<option value="">Select Role</option>';
selectsoftware_html += '</select>';
selectsoftware_html += '</li>';
selectsoftware_html += '<li width=1% data-ng-if="selectsoftwareCtrl.required && !selectsoftwareCtrl.disabled">';
selectsoftware_html += '<i class="material-icons set" data-ng-if="selectsoftwareCtrl.object">done</i>';
selectsoftware_html += '<i class="material-icons unset" data-ng-if="!selectsoftwareCtrl.object">error_outline</i>';
selectsoftware_html += '</li>';
selectsoftware_html += '</ul>';
selectsoftware_html += '<div data-ng-if=selectsoftwareCtrl.object>';
selectsoftware_html += '<ul class=item data-ng-repeat="each in selectsoftwareCtrl.object">';
selectsoftware_html += '<li><span><nobr>{{each.label}}</nobr></span></li>';
selectsoftware_html += '<li><span data-ng-if=each.role><nobr>{{each.role}}</nobr></span></li>';
selectsoftware_html += '<li><button type=button data-ng-click=selectsoftwareCtrl.RemoveObject(each)>Remove</button></li>';
selectsoftware_html += '</ul>';
selectsoftware_html += '</div>';
selectsoftware_html += '</fieldset>';

var selectsoftware_css = '';
selectsoftware_css += '<style>';
selectsoftware_css += 'selectsoftware-component { display: block; position: relative; }';
selectsoftware_css += 'selectsoftware-component > fieldset > ul { display: table; width: 100%; }';
selectsoftware_css += 'selectsoftware-component > fieldset > ul > li { display: table-cell; }';
selectsoftware_css += 'selectsoftware-component > fieldset > ul > li:first-child { width: 100%; }';
selectsoftware_css += 'selectsoftware-component > fieldset > ul > li:last-child { width: 1%; }';
selectsoftware_css += 'selectsoftware-component > fieldset > div { padding: .5rem 1rem; }';
selectsoftware_css += 'selectsoftware-component > fieldset > div > ul > li { display: table-cell; width: 50%; }';
selectsoftware_css += 'selectsoftware-component > fieldset > div > ul > li:last-child { width: 100%; padding-left: 1rem; text-align: right; }';
selectsoftware_css += '</style>';

function selectsoftwareCtrl($http)
{
  var selectsoftwareCtrl = this;

  selectsoftwareCtrl.$onInit = function() {
    var uri = 'https://netservices.internal.ca/lib/intakeservice.svc/json/clientsoftware';
    $http.get(uri).then(function(response) {
      var resp = response.data;
      selectsoftwareCtrl.options = {
        software: [],
        roles: null
      };
      selectsoftwareCtrl.options.software = resp.map(item => {
        return {
          label: item.ResourceName,
          value: item
        };
      }).sort();
    });
  }

  selectsoftwareCtrl.SetSoftware = function() {
    if(!selectsoftwareCtrl.multiple) {
      selectsoftwareCtrl.object = selectsoftwareCtrl.software;
      selectsoftwareCtrl.callback();
    } else {
      if(!selectsoftwareCtrl.software.value.Roles.length) {
        selectsoftwareCtrl.AddObject();
        selectsoftwareCtrl.callback();
      } else {
        selectsoftwareCtrl.options.roles = selectsoftwareCtrl.software.value.Roles.map(item => {
          return {
            label: item.Description,
            value: item
          };
        }).sort();
      }
    }
  }

  selectsoftwareCtrl.AddObject = function() {
    if(!selectsoftwareCtrl.items) selectsoftwareCtrl.items = [];
    selectsoftwareCtrl.items.push({
      label: selectsoftwareCtrl.software.label,
      role: (selectsoftwareCtrl.role ? selectsoftwareCtrl.role.label : undefined)
    });
    selectsoftwareCtrl.software = undefined;
    selectsoftwareCtrl.role = undefined;
    selectsoftwareCtrl.options.roles = undefined;
    selectsoftwareCtrl.object = selectsoftwareCtrl.items;
  }
  
  selectsoftwareCtrl.RemoveObject = function(obj) {
    selectsoftwareCtrl.items = selectsoftwareCtrl.items.filter(item => item !== obj);
    if(selectsoftwareCtrl.items.length != 0) {
      selectsoftwareCtrl.object = selectsoftwareCtrl.items;
    } else {
      selectsoftwareCtrl.items = undefined;
      selectsoftwareCtrl.object = undefined;
    }
    selectsoftwareCtrl.callback();
  }
  
  selectsoftwareCtrl.callback = function() {
    if(selectsoftwareCtrl.callbackFn != undefined) selectsoftwareCtrl.callbackFn({obj:selectsoftwareCtrl.object.value});
  }
}

const selectsoftwareComponent = {
  controller: selectsoftwareCtrl,
  controllerAs: 'selectsoftwareCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    disabled: '<?',
    required: '<',
    object: '=',
    param: '<?',
    multiple: '<?',
    roles: '<?'
  },
  template: selectsoftware_css + selectsoftware_html
};

angular.module('app').component('selectsoftwareComponent', selectsoftwareComponent);