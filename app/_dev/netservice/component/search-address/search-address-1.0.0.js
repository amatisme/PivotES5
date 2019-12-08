/** COMPONENT NETSERVICE SEARCHADDRESS - 1.0.0 *********************************/
var searchaddress_html = '';
searchaddress_html += '<ul>';
searchaddress_html += '<li>';
searchaddress_html += '<input autofocus type=text placeholder="Street Name" data-ng-model=searchaddressCtrl.query data-ng-change=searchaddressCtrl.Callback() data-ng-model-options="{debounce: 1000}">';
searchaddress_html += '</li>';
searchaddress_html += '</ul>';

var searchaddress_css = '';
searchaddress_css += '<style>';
searchaddress_css += 'searchaddress-component * { margin:0; padding:0; }';
searchaddress_css += 'searchaddress-component { display: block; position: relative; }';
searchaddress_css += 'searchaddress-component > ul { display: table; width: 100%; padding: 1em 0; border-bottom-style: solid; border-bottom-width: 1px; }';
searchaddress_css += 'searchaddress-component > ul > li { display: table-cell; }';
searchaddress_css += '</style>';

function searchaddressComponentCtrl($http) {
  var searchaddressCtrl = this;

  searchaddressCtrl.$onInit = function() {
    searchaddressCtrl.query = undefined;
  }

  searchaddressCtrl.Callback = function() {
    var uri = 'https://netservices.internal.ca/lib/AddressService.svc/json/';
    switch(searchaddressCtrl.type) {
      case "property":
        uri+= 'address/special/';
        break;
      case "special":
        uri+= 'property';
        break;
    }
    if(searchaddressCtrl.query.length > 2) {
      $http.get(uri + searchaddressCtrl.query).then(function(resp) {
        switch(searchaddressCtrl.type) {
          case "property":
            searchaddressCtrl.MapPropertyObject(resp.data);
            break;
          case "special":
            searchaddressCtrl.MapSpecialObject(resp.data);
            break;
        }
        searchaddressCtrl.callbackFn({obj:resp});
      });
    }
  }

  searchaddressCtrl.MapSpecialObject = function(objs) {
    selectaddressCtrl.object = objs.SpecialCollectionAddressesByStreetResult.map(item => {
      return {
        label: item.ADDRESS,
        properties: item
      };
    }).sort();
  }

  searchaddressCtrl.MapPropertyObject = function(objs) {
    selectaddressCtrl.object = objs.AllPropertiesResult.map(item => {
      return {
        label: item.MAILING1,
        properties: item
      };
    }).sort();
  }
}
const searchaddressComponent = {
  controller: searchaddressComponentCtrl,
  controllerAs: 'searchaddressCtrl',
  bindings: {
    callbackFn: '&',
    label: '<?'
  },
  template: searchaddress_css + searchaddress_html
};
angular.module('app').component('searchaddressComponent', searchaddressComponent);
