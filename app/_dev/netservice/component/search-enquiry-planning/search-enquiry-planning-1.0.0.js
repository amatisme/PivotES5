/** COMPONENT NETSERVICES SEARCHENQUIRYPLANNING - 1.0.0 ************************/
var searchenquiryplanning_html = '';
searchenquiryplanning_html += '<label data-ng-if=searchenquiryplanningCtrl.label>{{searchenquiryplanningCtrl.label}}</label>';
searchenquiryplanning_html += '<ul>';
searchenquiryplanning_html += '<li>';
searchenquiryplanning_html += '<input autofocus type=text placeholder="Keyword" data-ng-model=searchenquiryplanningCtrl.query data-ng-change=searchenquiryplanningCtrl.Callback() data-ng-model-options="{debounce: 1000}">';
searchenquiryplanning_html += '<span>{{searchenquiryplanningCtrl.submit.count}}</span>';
searchenquiryplanning_html += '<button data-ng-if=searchenquiryplanningCtrl.submit data-ng-click=searchenquiryplanningCtrl.Clear()><i class="material-icons">cancel</i></button>';
searchenquiryplanning_html += '<button data-ng-if=!searchenquiryplanningCtrl.submit data-ng-click=searchenquiryplanningCtrl.Callback()><i class="material-icons" title="Show All">visibility</i></button>';
searchenquiryplanning_html += '</li>';
searchenquiryplanning_html += '</ul>';

var searchenquiryplanning_css = '';
searchenquiryplanning_css += '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
searchenquiryplanning_css += '<style>';
searchenquiryplanning_css += 'searchenquiryplanning-component * { margin:0; padding:0; }';
searchenquiryplanning_css += 'searchenquiryplanning-component { display: block; position: relative; }';
searchenquiryplanning_css += 'searchenquiryplanning-component > ul { display: table; width: 100%; padding: 1em 0; border-bottom-style: solid; border-bottom-width: 1px; }';
searchenquiryplanning_css += 'searchenquiryplanning-component > ul > li { display: table-cell; white-space: nowrap; }';
searchenquiryplanning_css += 'searchenquiryplanning-component > ul > li:last-child { width: 100%; }';
searchenquiryplanning_css += 'searchenquiryplanning-component > ul > li:last-child > span { padding: 0 1em; }';
searchenquiryplanning_css += '</style>';

function SearchEnquiryPlanningComponentCtrl($http,$filter) {
  var searchenquiryplanningCtrl = this;

  searchenquiryplanningCtrl.$onInit = function() {
    searchenquiryplanningCtrl.query = undefined;
    searchenquiryplanningCtrl.options = [
      {value:'pothole',label:'Pot Holes'},
      {value:'culvert',label:'Culverts'}
    ];
  }

  searchenquiryplanningCtrl.SetCategory = function(str) {
    searchenquiryplanningCtrl.category = str;
  }

  searchenquiryplanningCtrl.Clear = function() {
    searchenquiryplanningCtrl.submit = undefined;
    searchenquiryplanningCtrl.query = undefined;
    searchenquiryplanningCtrl.callbackFn({obj:undefined});
  }

  searchenquiryplanningCtrl.Callback = function() {
    // if(searchenquiryplanningCtrl.query.length > 2) {
    $http.get('https://netservices.internal.ca/lib/OrganizationService.svc/json/azservice').then(function(response) {
      var objs = response.data.AllAZServicesResult;
      if(searchenquiryplanningCtrl.query && searchenquiryplanningCtrl.query.length > 2) {
        objs = $filter('filter')(objs, searchenquiryplanningCtrl.query);
      }
      var resp = {
        count: objs.length,
        query: searchenquiryplanningCtrl.query,
        data: objs
      }
      searchenquiryplanningCtrl.callbackFn({obj:resp});
      searchenquiryplanningCtrl.submit = {count:resp.count}
    });
    // }
  }
}
const searchenquiryplanningComponent = {
  controller: SearchEnquiryPlanningComponentCtrl,
  controllerAs: 'searchenquiryplanningCtrl',
  bindings: {
    callbackFn: '&',
    label: '<?'
  },
  template: searchenquiryplanning_css + searchenquiryplanning_html
};
angular.module('app').component('searchenquiryplanningComponent', searchenquiryplanningComponent);
