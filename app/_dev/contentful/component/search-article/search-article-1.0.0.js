/** COMPONENT CONTENTFUL SEARCHARTICLE - 1.0.0 *********************************/
var searcharticle_html = '';
searcharticle_html += '<fieldset>';
searcharticle_html += '<legend data-ng-if=searcharticleCtrl.label>{{searcharticleCtrl.label}}</legend>';
searcharticle_html += '<ul>';
searcharticle_html += '<li>';
searcharticle_html += '<input autofocus type=text placeholder="Keyword" data-ng-model=searcharticleCtrl.query data-ng-change=searcharticleCtrl.Callback() data-ng-model-options="{debounce: 1000}">';
searcharticle_html += '</li>';
searcharticle_html += '</ul>';
searcharticle_html += '</fieldset>';

var searcharticle_css = '';
searcharticle_css += '<style>';
searcharticle_css += 'searcharticle-component * { margin:0; padding:0; }';
searcharticle_css += 'searcharticle-component { display: block; position: relative; }';
searcharticle_css += 'searcharticle-component > ul { display: table; width: 100%; padding: 1em 0; border-bottom-style: solid; border-bottom-width: 1px; }';
searcharticle_css += 'searcharticle-component > ul > li { display: table-cell; }';
searcharticle_css += '</style>';

function SearchArticleComponentCtrl($http,$filter) {
  var searcharticleCtrl = this;
  searcharticleCtrl.uri = "http://127.0.0.1:8050/";
  searcharticleCtrl.header = {
    headers:{
      'Content-Type':'application/json',
      'Authorization': 'Basic [YOUR_BASIC_AUTH_HERE]'
    }
  };

  searcharticleCtrl.$onInit = function() {
    searcharticleCtrl.query = undefined;
  }

  searcharticleCtrl.Callback = function() {
    if(searcharticleCtrl.query.length > 2) {
      $http.get(searcharticleCtrl.uri + 'entries/' + searcharticleCtrl.sid + '/article/', searcharticleCtrl.header).then(function (response) {
        var resp = response.data;
        resp = $filter('filter')(resp, searcharticleCtrl.query);
        searcharticleCtrl.callbackFn({obj:resp});
      });
    }
  }
}
const searcharticleComponent = {
  controller: SearchArticleComponentCtrl,
  controllerAs: 'searcharticleCtrl',
  bindings: {
    callbackFn: '&',
    label: '<?',
    sid: '<'
  },
  template: searcharticle_css + searcharticle_html
};
angular.module('app').component('searcharticleComponent', searcharticleComponent);
