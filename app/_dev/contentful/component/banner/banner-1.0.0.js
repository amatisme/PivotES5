/********************************************************************************
** COMPONENT - BANNER - 1.0.0 ***************************************************
********************************************************************************/
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
      'Authorization': 'Basic [YOUR_BASIC_AUTH_HERE]'
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
