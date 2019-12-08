/** COMPONENT SEARCHEMPLOYEE - 1.0.0 ********************************************/
var searchemployee_html = '';
searchemployee_html += '<fieldset>';
searchemployee_html += '<legend data-ng-if=searchemployeeCtrl.label>{{searchemployeeCtrl.label}}</legend>';
searchemployee_html += '<ul>';
searchemployee_html += '<li>';
searchemployee_html += '<input autofocus type=text placeholder="Keyword" data-ng-model=searchemployeeCtrl.query data-ng-change=searchemployeeCtrl.Callback() data-ng-model-options="{debounce: 1000}">';
searchemployee_html += '</li>';
searchemployee_html += '</ul>';
searchemployee_html += '</fieldset>';

var searchemployee_css = '';
searchemployee_css += '<style>';
searchemployee_css += 'searchemployee-component * { margin:0; padding:0; }';
searchemployee_css += 'searchemployee-component { display: block; position: relative; }';
searchemployee_css += 'searchemployee-component > ul { display: table; width: 100%; padding: 1em 0; border-bottom-style: solid; border-bottom-width: 1px; }';
searchemployee_css += 'searchemployee-component > ul > li { display: table-cell; }';
searchemployee_css += '</style>';

function SearchEmployeeComponentCtrl($http,$filter) {
  var searchemployeeCtrl = this;

  searchemployeeCtrl.$onInit = function() {
    searchemployeeCtrl.query = undefined;
  }

  searchemployeeCtrl.Callback = function() {
    if(searchemployeeCtrl.query.length > 2) {
      $http.get('https://netservices.internal.ca/lib/EmployeeService.svc/json/employee').then(function(response) {
        var resp = response.data.ActiveEmployeesResult;
        resp = $filter('filter')(resp, searchemployeeCtrl.query);
        searchemployeeCtrl.callbackFn({obj:resp});
      });
    }
  }
}
const searchemployeeComponent = {
  controller: SearchEmployeeComponentCtrl,
  controllerAs: 'searchemployeeCtrl',
  bindings: {
    callbackFn: '&',
    label: '<?'
  },
  template: searchemployee_css + searchemployee_html
};
angular.module('app').component('searchemployeeComponent', searchemployeeComponent);
