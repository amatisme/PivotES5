/** COMPONENT NETSERVICES SELECTASSOCIATEEMAIL - 1.0.0 *************************/
var selectassociateemail_html = '';
selectassociateemail_html += '<fieldset>';
selectassociateemail_html += '<legend data-ng-if=selectassociateemailCtrl.label>{{selectassociateemailCtrl.label}}</legend>';
selectassociateemail_html += '<ul>';
selectassociateemail_html += '<li>';
selectassociateemail_html += '<input type=hidden data-ng-model=selectassociateemailCtrl.object data-ng-required=selectassociateemailCtrl.required />';
selectassociateemail_html += '<select name=selectassociateemail data-ng-model=selectassociateemailCtrl.email data-ng-options="each as each.label for each in selectassociateemailCtrl.options" data-ng-change=selectassociateemailCtrl.SetObject()>';
selectassociateemail_html += '<option value="">Please Select</option>';
selectassociateemail_html += '</select>';
selectassociateemail_html += '</li>';
selectassociateemail_html += '<li width=1% data-ng-if="selectassociateemailCtrl.required && !selectassociateemailCtrl.disabled">';
selectassociateemail_html += '<i class="material-icons set" data-ng-if="selectassociateemailCtrl.object">done</i>';
selectassociateemail_html += '<i class="material-icons unset" data-ng-if="!selectassociateemailCtrl.object">error_outline</i>';
selectassociateemail_html += '</li>';
selectassociateemail_html += '</ul>';
selectassociateemail_html += '<div data-ng-if=selectassociateemailCtrl.object>';
selectassociateemail_html += '<ul class=item data-ng-repeat="each in selectassociateemailCtrl.object">';
selectassociateemail_html += '<li><span><nobr>{{each.label}}</nobr></span></li>';
selectassociateemail_html += '<li><button type=button data-ng-click=selectassociateemailCtrl.RemoveObject(each)>Remove</button></li>';
selectassociateemail_html += '</ul>';
selectassociateemail_html += '</div>';
selectassociateemail_html += '</fieldset>';

var selectassociateemail_css = '';
selectassociateemail_css += '<style type="text/css">';
selectassociateemail_css += 'selectassociateemail-component { display: block; position: relative; width: 100%; }';
selectassociateemail_css += 'selectassociateemail-component > fieldset ul { display: table; width:100%; }';
selectassociateemail_css += 'selectassociateemail-component > fieldset ul li { display: table-cell; }';
selectassociateemail_css += 'selectassociateemail-component > fieldset > ul > li:first-child { width: 100%; }';
selectassociateemail_css += 'selectassociateemail-component > fieldset > div { padding: .5rem 1rem; }';
selectassociateemail_css += 'selectassociateemail-component > fieldset > div > ul > li:last-child { width: 100%; padding-left: 1rem; text-align: right; }';
selectassociateemail_css += '</style>';

function selectassociateemailCtrl($http)
{
  var selectassociateemailCtrl = this;
  
  selectassociateemailCtrl.$onInit = function() {
    var uri = 'https://netservices.internal.ca/lib/EmployeeService.svc/json/employee';
    $http.get(uri).then(function(resp) { 
        selectassociateemailCtrl.options = resp.data.ActiveEmployeesResult.map(item => {
            return {
                label: item.WorkEmail,
                value: item
            };
        }).filter(item => item.value.UserName).sort();
    });
  }

  selectassociateemailCtrl.SetObject = function() {
    if(!selectassociateemailCtrl.multiple) {
        selectassociateemailCtrl.object = selectassociateemailCtrl.email;
        selectassociateemailCtrl.callback();
    } else {
      //remove item from options
      selectassociateemailCtrl.options = selectassociateemailCtrl.options.filter(item => item !== selectassociateemailCtrl.email).sort();
      //add item to object
      selectassociateemailCtrl.AddObject();
      selectassociateemailCtrl.callback();
    }
  }

  selectassociateemailCtrl.AddObject = function() {
    if(!selectassociateemailCtrl.emails) selectassociateemailCtrl.emails = [];
    selectassociateemailCtrl.emails.push(selectassociateemailCtrl.email);
    selectassociateemailCtrl.email = undefined;
    selectassociateemailCtrl.object = selectassociateemailCtrl.emails;
  }

  selectassociateemailCtrl.RemoveObject = function(obj) {
    //Adding item back to options
    selectassociateemailCtrl.options.push(obj);
    //removing item from object
    selectassociateemailCtrl.emails = selectassociateemailCtrl.emails.filter(item => item !== obj);
    if(selectassociateemailCtrl.emails.length != 0) {
        selectassociateemailCtrl.object = selectassociateemailCtrl.emails;
    } else {
        selectassociateemailCtrl.emails = undefined;
      selectassociateemailCtrl.object = undefined;
    }
  }

  selectassociateemailCtrl.callback = function() {
    if(selectassociateemailCtrl.callbackFn != undefined) selectassociateemailCtrl.callbackFn({obj:selectassociateemailCtrl.object.value});
  }
}
const selectassociateemailComponent = {
  controller: selectassociateemailCtrl,
  controllerAs: 'selectassociateemailCtrl',
  bindings: {
    callbackFn: '&?',
    object: '=',
    label: '<',
    disabled: '<?',
    required: '<',
    multiple: '<?'
  },
  template: selectassociateemail_css + selectassociateemail_html
};
angular.module('app').component('selectassociateemailComponent', selectassociateemailComponent);