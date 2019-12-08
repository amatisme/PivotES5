const contentful_auth = 'Basic YOUR_BASICAUTH_HERE';


/***
*** SERVICES
***/



/** SERVICE CONTENTFUL - 1.0.0 *************************************************/
app.service('contentfulService', function ($q,$http,$filter)
{
  var srv = this;
  srv.uri = "https://cdn.contentful.com/spaces/YOUR_SPACEID_HERE/";
  srv.header = {headers:{'Content-Type':'application/json','Authorization': 'Bearer YOUR_BEARER_TOKEN_HERE'}};

  this.GetEntries = function() {
    var deferred = $q.defer();
    $http.get(srv.uri + "entries/", srv.header).then(function (response) {
      //store
      srv.entries = response.data.items;
      //collect
      var articles = $filter('filter')(response.data.items, {sys:{contentType:{sys:{id:'article'}}}});
      var accordions = $filter('filter')(response.data.items, {sys:{contentType:{sys:{id:'accordian'}}}});
      var menus = $filter('filter')(response.data.items, {sys:{contentType:{sys:{id:'menu'}}}});
      var galleries = $filter('filter')(response.data.items, {sys:{contentType:{sys:{id:'gallery'}}}});
      var blocks = $filter('filter')(response.data.items, {sys:{contentType:{sys:{id:'block'}}}});
      //map
      deferred.resolve({
        articles: articles.map(obj => srv.MapArticle(obj,obj.sys.id)),
        accordions: accordions.map(obj => srv.MapAccordion(obj,obj.sys.id)),
        menus: menus.map(obj => srv.MapMenu(obj,obj.sys.id)),
        galleries: galleries.map(obj => srv.MapGallery(obj,obj.sys.id)),
        blocks: blocks.map(obj => srv.MapBlock(obj,obj.sys.id))
      });
    });
    return deferred.promise;
  }

  this.GetAssets = function() {
    var deferred = $q.defer();
    $http.get(srv.uri + "assets/", srv.header).then(function (response) {
      //map
      srv.assets = response.data.items.map(obj => srv.MapAsset(obj,obj.sys.id));
      deferred.resolve(srv.assets);
    });
    return deferred.promise;
  }

  this.parseRichText = function(obj) {
    var deferred = $q.defer();
    //retrieve the object and insert into node array at index
    var contentArray = [];
    for(var i = 0; i < obj.content.length; i++) {
      switch(obj.content[i].nodeType) {
        case "embedded-asset-block":
          contentArray.push(undefined); //claim array index during async
          srv.GetRichTextAsset(obj.content[i].data.target.sys.id,i).then(function (asset) {
            if(asset.index !== -1) contentArray[asset.index] = {component:'image',data:asset.data};
          });
        break;
        case "embedded-entry-block":
          contentArray.push(undefined); //claim array index during async
          srv.GetRichTextEntry(obj.content[i].data.target.sys.id,i).then(function (entry) {
            if(entry.index !== -1) contentArray[entry.index] = {component:entry.component,data:entry.data};
          });
        break;
        default:
          contentArray.push({component:'html',data:srv.parseRichTextNode(obj.content[i])});
        break;
      }
    }
    var output = "";
    for(var i = 0; i < contentArray.length; i++) { output+= contentArray[i]; }
    deferred.resolve(contentArray);
    return deferred.promise;
  }

  this.GetRichTextAsset = function(id,index) {
    var deferred = $q.defer();
    var obj = $filter('filter')(srv.assets, {id: id})[0];
    deferred.resolve({
      index: index,
      data: obj
    });
    return deferred.promise;
  }

  this.GetRichTextEntry = function(id,index) {
    var deferred = $q.defer();
    //filter out object
    var obj = $filter('filter')(srv.entries, {sys:{id: id}})[0];
    switch(obj.sys.contentType.sys.id) {
      case "accordian":
        //parse rich text
        srv.parseRichText(obj.fields.text).then(function (text) {
          obj.fields.text = text;
          deferred.resolve({
            index:index,
            component: "accordion",
            data: srv.MapAccordion(obj)
          });
        });
        break;
      case "gallery":
        // parse rich text
        srv.parseRichText(obj.fields.assets).then(function (assets) {
          obj.fields.assets = assets
          deferred.resolve({
            index:index,
            component: "gallery",
            data: srv.MapGallery(obj)
          });
        });
        break;
      case "note":
        deferred.resolve({
          index:index,
          component: "note",
          data: srv.MapNote(obj)
        });
        break;
      default: break;
    }
    return deferred.promise;
  }

  this.parseRichTextNode = function(obj) {
    var output = "";
    if(obj.nodeType != "text") {
      for(var i = 0; i < obj.content.length; i++) {
        var tag = "";
        switch(obj.nodeType) {
          case "blockquote": tag = "blockquote"; break;
          case "paragraph": tag = "p"; break;
          case "unordered-list": tag = "ul"; break;
          case "list-item": tag = "li"; break;
          case "hyperlink": tag = "a"; break;
          case "heading-1": tag = "h1"; break;
          case "heading-2": tag = "h2"; break;
          case "heading-3": tag = "h3"; break;
          case "heading-4": tag = "h4"; break;
          case "heading-5": tag = "h5"; break;
          case "heading-6": tag = "h6"; break;
          default: break;
        }
        //render node
        if(tag && i == 0) output += '<' + tag + (tag == "a" ? ' href="' + obj.data.uri + '"' : '') + '>';
        output += srv.parseRichTextNode(obj.content[i]);
        if(tag && i == (obj.content.length - 1)) output += '</' + tag + '>';
      }
    } else if(obj.marks) { //render final text with marks
      if(obj.marks.length) {
        for(var i = 0; i < obj.marks.length; i++) {
          var tag = "";
          switch(obj.marks[i].type) {
            case "bold": tag = "b"; break;
            case "italic": tag = "i"; break;
            case "underline": tag = "u"; break;
            default: break;
          }
          if(tag && i == 0) output += '<' + tag + '>';
          output += obj.value;
          if(tag && i == (obj.marks.length - 1)) output += '</' + tag + '>';
        }
      } else {
        output += obj.value;
      }
    } else {
      output += obj.value;
    }
    return output;
  }

  this.MapArticle = function(obj,id) {
    var menu_id = (obj.fields.menuId ? obj.fields.menuId : undefined);
    var aside_image_id = (obj.fields.asideImage ? obj.fields.asideImage.sys.id : undefined);
    var body_image_id = (obj.fields.bodyImage ? obj.fields.bodyImage.sys.id : undefined);
    return {
      id: id,
      name: obj.fields.name,
      label: obj.fields.label,
      title: obj.fields.title,
      business_unit: obj.fields.businessUnit,
      blocks: obj.fields.blocks,
      notes: obj.fields.notes,
      content: obj.fields.content,
      enhanced: (obj.fields.template == 'Landing' ? true : false),
      aside_image_id: aside_image_id,
      body_image_id: body_image_id,
      menu_id: menu_id
    }
  }

  this.MapMenu = function(obj,id) {
    return {
      id: id,
      name: obj.fields.name,
      label: obj.fields.label,
      description: obj.fields.description,
      data: obj.fields.data,
      image: obj.fields.image,
      type: obj.fields.type
    }
  }

  this.MapBlock = function(obj,id) {
    return {
      id: id,
      name: obj.fields.name,
      label: obj.fields.label,
      icon: obj.fields.labelIcon,
      detail: obj.fields.detail,
      style: obj.fields.style
    }
  }

  this.MapAsset = function(obj,id) {
    return {
      id: id,
      url: obj.fields.file.url,
      type: obj.fields.file.contentType,
      size: obj.fields.file.details.size,
      image: obj.fields.file.details.image,
      description: obj.fields.description
    }
  }

  this.MapAccordion = function(obj,id) {
    var content = (obj.fields.text ? obj.fields.text : obj.fields.content);
    return {
      id: id,
      label: obj.fields.label,
      title: obj.fields.title,
      content: content
    }
  }

  this.MapGallery = function(obj,id) {
    return {
      id: id,
      name: obj.fields.name,
      title: obj.fields.title,
      images: obj.fields.assets
    }
  }

  this.MapNote = function(obj,id) {
    return {
      id: id,
      label: obj.fields.label,
      detail: obj.fields.detail
    }
  }
});



/***
*** COMPONENTS
***/

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
      'Authorization': contentful_auth
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


/** COMPONENT BANNER - 1.0.0 *************************************************/
var banner_html = '';
banner_html += '<div data-ng-if=bannerCtrl.objects style="background-image: url(\'{{bannerCtrl.object.file}}\')" data-ng-animate-swap=bannerCtrl.index class="swap-animation" data-ng-class=bannerCtrl.SetObject()>';
banner_html += '<ul>';
banner_html += '<li data-ng-click=bannerCtrl.Callback()>';
banner_html += '<label data-ng-if=bannerCtrl.object.label>{{bannerCtrl.object.label}}</label>';
banner_html += '<label data-ng-if=bannerCtrl.object.description>{{bannerCtrl.object.description}}</label>';
banner_html += '</li>';
banner_html += '<li data-ng-if=bannerCtrl.multiple>';
banner_html += '<button data-ng-click=bannerCtrl.SetIndex($index) data-ng-repeat="each in [].constructor(bannerCtrl.objects.length) track by $index" data-ng-class="{\'active\': $index == bannerCtrl.index}"></button>';
banner_html += '</li>';
banner_html += '</ul>';
banner_html += '</div>';

var banner_css = '';
banner_css += '<style type="text/css">';
banner_css += 'banner-component * { margin: 0; padding: 0; }';
banner_css += 'banner-component { display: block; position: relative; width: 100%; height: 50%; }';
banner_css += 'banner-component > div { display: flex; align-items: flex-end; width: 100%; height: 25em; }';
banner_css += 'banner-component > div > ul { display: table; width: 100%; margin: 1em; padding: 1em; background-color: RGB(255,255,255); }';
banner_css += 'banner-component > div > ul > li { display: table-cell; vertical-align: bottom; }';
banner_css += 'banner-component > div > ul > li:first-child { width: 100%; }';
banner_css += 'banner-component > div > ul > li:first-child > label { display: block; }';
banner_css += 'banner-component > div > ul > li:first-child > label:first-child { font-size: 2em; }';
banner_css += 'banner-component > div > ul > li:last-child { whitespace: no-wrap; }';
banner_css += 'banner-component > div > ul > li:last-child > button { border: none; background-color:RGB(200,200,200); width: 1em; height: 1em; margin-right: .5em; }';
banner_css += 'banner-component > div > ul > li:last-child > button.active, banner-component > div > ul > li:last-child > button:hover { background-color: RGB(0,0,0); }';
banner_css += 'banner-component .swap-animation.ng-enter, .swap-animation.ng-leave { transition:2s linear all; }';
banner_css += 'banner-component .swap-animation.ng-enter { opacity: 0; }';
banner_css += 'banner-component .swap-animation.ng-leave { opacity: 1; }';
banner_css += '</style>';

function BannerComponentCtrl ($q,$http,$window,$interval) {
  var bannerCtrl = this;
  bannerCtrl.uri = "http://127.0.0.1:8050/";
  bannerCtrl.header = {
    headers:{
      'Content-Type':'application/json',
      'Authorization': contentful_auth
    }
  };

  bannerCtrl.$onInit = function() {
    bannerCtrl.GetEntries().then(function (response) {
      console.log(response);
      bannerCtrl.objects = response;
      console.log(bannerCtrl.objects.length);
      if(!bannerCtrl.index) bannerCtrl.SetIndex(0);
      if(!bannerCtrl.interval) bannerCtrl.interval = false;
      bannerCtrl.multiple  = (bannerCtrl.objects.length > 1 ?  true : false);
      bannerCtrl.SetObject();

      $interval(function() {
        if(bannerCtrl.multiple && bannerCtrl.interval) bannerCtrl.index++;
      }, bannerCtrl.interval);
    });
  }

  bannerCtrl.SetIndex = function(int) {
    bannerCtrl.index = int;
  }

  bannerCtrl.SetObject = function() {
    if(bannerCtrl.index >= bannerCtrl.objects.length) bannerCtrl.SetIndex(0);
    if(bannerCtrl.objects[bannerCtrl.index]) bannerCtrl.object = bannerCtrl.objects[bannerCtrl.index].fields;
  }

  bannerCtrl.GetEntries = function() {
    var objs = [];
    var deferred = $q.defer();
    var count = 0;
    $http.get(bannerCtrl.uri + 'entries/' + bannerCtrl.sid + '/banner/', bannerCtrl.header).then(function (response) {
      var resp = response.data;
      for(var i = 0; i < resp.length; i++) {
        bannerCtrl.GetEntry(resp[i].id).then(function (obj) {
          objs.push(obj);
          // count and compare to mitigate early async exit
          count++;
          if(count == resp.length) deferred.resolve(objs);
        });
      }
    });
    return deferred.promise;
  }

  bannerCtrl.GetEntry = function(id) {
    var deferred = $q.defer();
    $http.get(bannerCtrl.uri + 'entry/' + bannerCtrl.sid + '/' + id + '/', bannerCtrl.header).then(function (response) {
      var obj = response.data;
      //check if object has attachment
      if(obj.fields.image != undefined) {
        $http.get(bannerCtrl.uri + 'asset/' + bannerCtrl.sid + '/' + obj.fields.image.sys.id, bannerCtrl.header).then(function (file) {
          obj.fields.file = file.data.fields.file.url;
        });
      }
      deferred.resolve(obj);
    });
    return deferred.promise;
  }

  bannerCtrl.Callback = function() {
    if(bannerCtrl.callbackFn) bannerCtrl.callbackFn({obj:bannerCtrl.object});
  }
}
const bannerComponent = {
  controller: BannerComponentCtrl,
  controllerAs: 'bannerCtrl',
  bindings: {
    callbackFn: '&?',
    objects: '<',
    index: '<?',
    interval: '<?',
    sid: '<'
  },
  template: banner_css + banner_html
};
angular.module('app').component('bannerComponent', bannerComponent);



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
      'Authorization': contentful_auth
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
