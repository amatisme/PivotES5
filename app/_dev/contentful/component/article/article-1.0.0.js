/** COMPONENT ARTICLE - 1.0.0 ************************************************/
var article_html = '';
article_html += '<div data-ng-if=articleCtrl.object>';
article_html += '<h1 data-ng-if=articleCtrl.object.fields.label>{{articleCtrl.object.fields.label}}</h1>';
article_html += '<div data-ng-if=articleCtrl.object.fields.image><img data-ng-src="http:{{articleCtrl.object.fields.image}}" /></div>';
article_html += '<div markdown data-ng-bind-html="articleCtrl.object.fields.bodyText | markdown">{{articleCtrl.object.fields.bodyText}}</div>';
article_html += '</div>';

var article_css = '';
article_css += '<style type="text/css">';
article_css += 'article-component { display: block; position: relative; padding: 1em; background-color: WHITESMOKE; }';
article_css += '</style>';

function ArticleComponentCtrl ($q,$http,$window,$interval) {
  var articleCtrl = this;
  articleCtrl.uri = "http://127.0.0.1:8050/";
  articleCtrl.header = {
    headers:{
      'Content-Type':'application/json',
      'Authorization': 'Basic [YOUR_BASIC_AUTH_HERE]'
    }
  };

  articleCtrl.$onInit = function() {
    articleCtrl.GetEntry().then(function (response) {
      articleCtrl.object = response;
    });
  }

  articleCtrl.GetEntry = function() {
    var deferred = $q.defer();
    $http.get(articleCtrl.uri + 'entry/' + articleCtrl.sid + '/' + articleCtrl.aid + '/', articleCtrl.header).then(function (response) {
      if(response.data.id=="NotFound") {
        deferred.resolve({error:'ID provided is not valid.'});
        return deferred.promise;
      }
      var obj = response.data;
      //check if object has attachment
      if(obj.fields.bodyImage != undefined) {
        $http.get(articleCtrl.uri + 'asset/' + articleCtrl.sid + '/' + obj.fields.bodyImage.sys.id, articleCtrl.header).then(function (file) {
          obj.fields.image = file.data.fields.file.url;
        });
      }
      deferred.resolve(obj);
    });
    return deferred.promise;
  }

  articleCtrl.Callback = function() {
    if(articleCtrl.callbackFn) articleCtrl.callbackFn({obj:articleCtrl.object});
  }
}
const articleComponent = {
  controller: ArticleComponentCtrl,
  controllerAs: 'articleCtrl',
  bindings: {
    callbackFn: '&?',
    sid: '<',
    aid: '<'
  },
  template: article_css + article_html
};
angular.module('app').component('articleComponent', articleComponent);