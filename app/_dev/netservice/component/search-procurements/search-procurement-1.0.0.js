/** COMPONENT SEARCHPROCUREMENT - 1.0.0 ****************************************/
var searchprocurement_html = '';
searchprocurement_html += '<fieldset>';
searchprocurement_html += '<legend data-ng-if=searchprocurementCtrl.label>{{searchprocurementCtrl.label}}</legend>';
searchprocurement_html += '<ul>';
searchprocurement_html += '<li>';
searchprocurement_html += '<input autofocus type=text placeholder="Keyword" data-ng-model=searchprocurementCtrl.query data-ng-change=searchprocurementCtrl.Callback() data-ng-model-options="{debounce: 1000}">';
searchprocurement_html += '</li>';
searchprocurement_html += '</ul>';
searchprocurement_html += '</fieldset>';

var searchprocurement_css = '';
searchprocurement_css += '<style>';
searchprocurement_css += 'searchprocurement-component { display: block; position: relative; }';
searchprocurement_css += 'searchprocurement-component > ul { display: table; width: 100%; padding: 1em 0; border-bottom-style: solid; border-bottom-width: 1px; }';
searchprocurement_css += 'searchprocurement-component > ul > li { display: table-cell; }';
searchprocurement_css += '</style>';

function SearchProcurementComponentCtrl($http,$filter) {
  var searchprocurementCtrl = this;

  searchprocurementCtrl.$onInit = function() {
    searchprocurementCtrl.query = undefined;
  }

  searchprocurementCtrl.Callback = function() {
    if(searchprocurementCtrl.query.length > 2) {
      $http.get('https://netservices.internal.ca/lib/cos/PurchasingProjectService.svc/json/project').then(function(response) {
        var resp = response.data;
        resp = $filter('filter')(resp, searchprocurementCtrl.query);
        searchprocurementCtrl.callbackFn({obj:resp});
      });
    }
  }
}
const searchprocurementComponent = {
  controller: SearchProcurementComponentCtrl,
  controllerAs: 'searchprocurementCtrl',
  bindings: {
    callbackFn: '&',
    label: '<?'
  },
  template: searchprocurement_css + searchprocurement_html
};
angular.module('app').component('searchprocurementComponent', searchprocurementComponent);
