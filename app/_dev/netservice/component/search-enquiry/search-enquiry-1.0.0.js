/** COMPONENT SEARCHENQUIRY - 1.0.0 ********************************************/
var searchenquiry_html = '';
searchenquiry_html += '<fieldset>';
searchenquiry_html += '<legend data-ng-if=searchenquiryCtrl.label>{{searchenquiryCtrl.label}}</legend>';
searchenquiry_html += '<ul>';
searchenquiry_html += '<li>';
searchenquiry_html += '<select name=category data-ng-model=searchenquiryCtrl.category data-ng-change=searchenquiryCtrl.SetCategory(searchenquiryCtrl.category)>';
searchenquiry_html += '<option value="">Select</option>';
searchenquiry_html += '<option value="{{each.value}}" data-ng-selected="{{each == searchenquiryCtrl.category}}" data-ng-repeat="each in searchenquiryCtrl.options">{{each.label}}</option>';
searchenquiry_html += '</select>';
searchenquiry_html += '</li>';
searchenquiry_html += '<li data-ng-if=searchenquiryCtrl.category>';
searchenquiry_html += '<input autofocus type=text placeholder="Keyword" data-ng-model=searchenquiryCtrl.query data-ng-change=searchenquiryCtrl.Callback() data-ng-model-options="{debounce: 1000}">';
searchenquiry_html += '</li>';
searchenquiry_html += '</ul>';
searchenquiry_html += '</fieldset>';

var searchenquiry_css = '';
searchenquiry_css += '<style>';
searchenquiry_css += 'searchenquiry-component * { margin:0; padding:0; }';
searchenquiry_css += 'searchenquiry-component { display: block; position: relative; }';
searchenquiry_css += 'searchenquiry-component > ul { display: table; width: 100%; padding: 1em 0; border-bottom-style: solid; border-bottom-width: 1px; }';
searchenquiry_css += 'searchenquiry-component > ul > li { display: table-cell; }';
searchenquiry_css += 'searchenquiry-component > ul > li:last-child { width: 100%; }';
searchenquiry_css += '</style>';

function SearchEnquiryComponentCtrl($http,$filter) {
  var searchenquiryCtrl = this;

  searchenquiryCtrl.$onInit = function() {
    searchenquiryCtrl.query = undefined;
    searchenquiryCtrl.options = [
      {value:'pothole',label:'Pot Holes'},
      {value:'culvert',label:'Culverts'}
    ];
  }

  searchenquiryCtrl.SetCategory = function(str) {
    searchenquiryCtrl.category = str;
  }

  searchenquiryCtrl.Callback = function() {
    if(searchenquiryCtrl.query.length > 2) {
      $http.get('https://netservices.internal.ca//lib/vendor/CityworksService.svc/json/' + searchenquiryCtrl.category).then(function(response) {
        var resp = response.data.GetCityworksRequestsResult;
        resp = $filter('filter')(resp, searchenquiryCtrl.query);
        searchenquiryCtrl.callbackFn({obj:resp});
      });
    }
  }
}
const searchenquiryComponent = {
  controller: SearchEnquiryComponentCtrl,
  controllerAs: 'searchenquiryCtrl',
  bindings: {
    callbackFn: '&',
    label: '<?'
  },
  template: searchenquiry_css + searchenquiry_html
};
angular.module('app').component('searchenquiryComponent', searchenquiryComponent);