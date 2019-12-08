/** DIRECTIVE EMLABEL - 1.0.0 **************************************************/
var emlabel_html = '';
emlabel_html += '<span data-ng-if="!searchterm.value && !linky">{{label}}</span>';
emlabel_html += '<span data-ng-if="!searchterm.value && linky" data-ng-bind-html="label | tweetLinky:linky"></span>';
emlabel_html += '<span data-ng-if="searchterm.value && !linky" data-ng-bind-html="label | Emphasis:searchterm.value.$"></span>';
emlabel_html += '<span data-ng-if="searchterm.value && linky" data-ng-bind-html="label | tweetLinky:linky | Emphasis:searchterm.value.$"></span>';

var emlabel_css = '';

app.directive('emlabelComponent', function() {
  return {
    restrict: 'E',
    scope: {
      label: '=label',
      searchterm: '=searchterm',
      linky: '=linky'
    },
    template: emlabel_css + emlabel_html
  }
});
