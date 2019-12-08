/** COMPONENT SEARCHKEYWORD - 1.0.1 ********************************************/
var searchkeyword_html = '';
searchkeyword_html += '<ul>';
searchkeyword_html += '<li><i class="material-icons">search</i></li>';
searchkeyword_html += '<li>';
searchkeyword_html += '<input autofocus placeholder={{searchkeywordCtrl.placeholder}} type=text class="ui-stretch" data-ng-model=searchkeywordCtrl.query.value.$ data-ng-change=searchkeywordCtrl.SetSearch(searchkeywordCtrl.query) data-ng-model-options="{debounce: 1000}">';
searchkeyword_html += '</li>';
searchkeyword_html += '<li data-ng-if=searchkeywordCtrl.count>';
searchkeyword_html += '{{searchkeywordCtrl.count}}';
searchkeyword_html += '</li>';
searchkeyword_html += '<li data-ng-if=searchkeywordCtrl.query.value.$>';
searchkeyword_html += '<button data-ng-click=searchkeywordCtrl.Cancel()><i class="material-icons set">close</i></button>';
searchkeyword_html += '</li>';
searchkeyword_html += '</ul>';

var searchkeyword_css = '';
searchkeyword_css += '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
searchkeyword_css += '<style>';
searchkeyword_css += 'searchkeyword-component { display: block; position: relative; }';
searchkeyword_css += 'searchkeyword-component > ul { display: table; margin: 0; padding: 0;}';
searchkeyword_css += 'searchkeyword-component > ul > li { display: table-cell; margin: 0; padding: 0;}';
searchkeyword_css += 'searchkeyword-component > ul > li > input { padding: 0 .5rem;}';
searchkeyword_css += '</style>';

function SearchKeywordComponentCtrl($routeParams) {
  var searchkeywordCtrl = this;

  searchkeywordCtrl.$onInit = function() {
    if(!$routeParams.query) searchkeywordCtrl.query = undefined;
    if($routeParams.query) searchkeywordCtrl.query = {value:{$:$routeParams.query}};
  }
  searchkeywordCtrl.SetSearch = function(arg) {
    if(arg == undefined || arg && !(arg.value.$).length) {
      searchkeywordCtrl.query = undefined;
    }
    if(arg && (arg.value.$).length > 2) {
      if(searchkeywordCtrl.callbackFn) searchkeywordCtrl.callbackFn({obj:searchkeywordCtrl.query});
      searchkeywordCtrl.query = arg;
    }
  }
  searchkeywordCtrl.SearchActive = function() {
    var bool = false;
    if(searchkeywordCtrl.query) bool = true;
    return bool;
  }
  searchkeywordCtrl.Cancel = function() {
    if(searchkeywordCtrl.callbackFn) searchkeywordCtrl.callbackFn({obj:undefined});
    searchkeywordCtrl.query = undefined;
  }
}
const searchkeywordComponent = {
  controller: SearchKeywordComponentCtrl,
  controllerAs: 'searchkeywordCtrl',
  bindings: {
    callbackFn: '&?',
    query: '=',
    placeholder: '<?',
    count:'<?'
  },
  template: searchkeyword_css + searchkeyword_html
};
angular.module('app').component('searchkeywordComponent', searchkeywordComponent);