/***
*** MD5
***/
!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}"function"==typeof define&&define.amd?define(function(){return A}):"object"==typeof module&&module.exports?module.exports=A:n.md5=A}(this);
//# sourceMappingURL=md5.min.js.map



/***
*** CONFIG
***/
'use strict';
var app = angular.module('app', ['ngRoute','ngSanitize']);
app.config(['$routeProvider', '$sceDelegateProvider', function ($routeProvider, $sceDelegateProvider)
{
  $sceDelegateProvider.resourceUrlWhitelist(['self', app.pivot.template.host + '**']);
  var templatePath = app.pivot.template.host + '/' + app.pivot.template.version + '/template/' + app.pivot.template.name + '/index.html';
  $routeProvider
      .when('/', { templateUrl: templatePath, controller: 'appCtrl', controllerAs: 'ctrl' })
      .otherwise({ redirectTo: '/' });
}]);



/***
*** FILTERS
***/

/** FILTER CAPITALIZE - 1.0.0 ***************************************************/
app.filter('Capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
  });
  /** FILTER DATEOBJECT - 1.0.0 ***************************************************/
  app.filter("DateObject", function() {
      return function (x) {
          if(!x) return false;
          return new Date(parseInt(x.substr(6)));
      };
  });
  /** FILTER DYNAMICDATE - 1.0.0 **************************************************/
  app.filter('DynamicDate', ['$filter',
    function ($filter) {
      return function (adate) {
        var sd = new Date(adate);
        var ed = new Date();
  
        if (($filter('date')(ed, 'ddMMyyyyHHmm') == $filter('date')(sd, 'ddMMyyyyHHmm'))) {
            return 'seconds ago...';
        } else if (($filter('date')(ed, 'ddMMyyyy') == $filter('date')(sd, 'ddMMyyyy'))) {
            return 'Today at ' + $filter('date')(sd, 'HH:mm a');
        } else {
            return $filter('date')(sd, 'dd MMM yyyy');
        }
      };
    }
  ]);
  /** FILTER EMPHASIS - 1.0.0 *****************************************************/
  app.filter('Emphasis', ['$filter', '$sce',
    function ($filter, $sce) {
      return function (text, searchterm) {
        if (searchterm && text != null) {
          return text.replace(new RegExp('(' + searchterm + ')', 'gi'),'<em>$1</em>');
        } else {
          return text;
        }
      };
    }
  ]);
  /** FILTER SETTAGS - 1.0.0 ******************************************************/
  app.filter('SetTags', function () {
    return function (text) {
      if(!text) return text;
      var replacePattern1 = /#(\w*[a-zA-Z_]+\w*)/gim;
      var matches = String(text).match(replacePattern1);
      return matches;
    };
  });
  /** FILTER STRIPBODY - 1.0.0 ****************************************************/
  app.filter('StripBody', ['$filter', '$sce',
    function ($filter, $sce) {
      return function (text) {
        if (!text) return text;
        var replacePattern1 = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
        return text.replace(replacePattern1, '$1');
      };
    }
  ]);
  /** FILTER STRIPTAGS - 1.0.0 ****************************************************/
  app.filter('StripTags', ['$filter', '$sce',
    function ($filter, $sce) {
      return function (text) {
        if (!text) return text;
        var replacePattern1 = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
        return text.replace(replacePattern1, '$2');
      };
    }
  ]);
  /** FILTER TWEETLINKY - 1.0.0 ***************************************************/
  app.filter('tweetLinky', ['$filter', '$sce',
    function ($filter, $sce) {
        return function (text, url) {
            if (!text) return text;
  
            var replacedText = $filter('linky')(text, '_blank');
            var targetAttr = "'_blank'";
  
            // replace #hashtags
            var replacePattern1 = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
            replacedText = replacedText.replace(replacePattern1, '$1<a href="#/tag/$2" target="_self">#$2</a>');
  
            // replace @mentions
            var replacePattern2 = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
            replacedText = replacedText.replace(replacePattern2, '$1<a href="https://twitter.com/$2"' + targetAttr + '>@$2</a>');
  
            $sce.trustAsHtml(replacedText);
            return replacedText;
        };
    }
  ]);


/** SERVICE AUTH - 1.0.0 *******************************************************/
angular.module('app').service('authService', function (userService) {
    // User
    var srv = this;
    srv.force = false;
  
    srv.SetUser = function(obj) {
      srv.SetAuthorizedUser(obj);
    }
    
    srv.GetAuthorizedUser = function(config = undefined) {
      srv.user = JSON.parse(window.localStorage.getItem(md5("authorized_user")));
      return srv.user;
    }
  
    srv.SetAuthorizedUser = function(obj) {
      var user = (!obj.first_name ? userService.MapUserObject(obj) : obj);
      window.localStorage.setItem(md5("authorized_user"), JSON.stringify(user));
      srv.user = user;
    }
  
    srv.UnsetAuthorizedUser = function() {
      window.localStorage.removeItem(md5("authorized_user"));
    }
  });
  
  
  
  /** SERVICE FORM - 1.0.0 *******************************************************/
  app.service('formService', function ()
  {
    var srv = this;
    srv.forms = app.pivot.forms;
    if(srv.forms.length == 1) srv.form = app.pivot.forms[0];
  
    srv.SetUser = function(obj) {
      srv.user = obj;
    }
    
    srv.SetForm = function(obj) {
      srv.form = obj;
      if(!srv.form.types) { //is final option
        srv.type = obj;
        srv.notification = srv.form.notification;
        srv.validate = srv.form.validate;
      }
    }
  
    srv.UnsetForm = function() {
      if(srv.type) srv.type = undefined;
      if(srv.notification) srv.notification = false;
      if(srv.validate) srv.validate = false;
      srv.form = undefined;
      srv.submit = undefined;
      srv.object = undefined;
      srv.crumb = undefined;
    }
  
    srv.SetCrumb = function(str) {
      if(!srv.crumb) srv.crumb = [];
      srv.crumb.push(str);
    }
  
    srv.UnsetCrumb = function(index) {
      (index == 0 ? this.UnsetForm() : this.UnsetType());
    }
  
    srv.SetType = function(str) {
      srv.type = str;
      srv.SetValidate();
      srv.SetNotification();
    }
  
    srv.UnsetType = function() {
      srv.type = undefined;
      srv.notification = undefined;
      srv.validate = undefined;
      srv.object = undefined;
      srv.crumb.pop();
    }
  
    srv.SetNotification = function() {
      srv.notification = srv.form.notification;
    }
  
    srv.SetValidate = function() {
      srv.validate = true;
    }
  
    srv.AuthorizeByGroups = function(group,groups) {
      if(!groups) return true;
      return groups.filter(name => group.includes(name)).length != 0;
    }
  });
  
  
  
    /** SERVICE TEMPLATE - 1.0.2 ***************************************************/
    app.service('templateService', function ($http) {
        var srv = this;
        
        //set page title
        document.title = app.pivot.title;
        
        //load globals
        srv.label = app.pivot.label;
        srv.sublabel = app.pivot.sublabel;
        srv.host = app.pivot.template.host;
        srv.name = app.pivot.template.name;
        srv.version = app.pivot.template.version;
        srv.view = app.pivot.template.view;
    
        //load template config
        $http.get(srv.host + '/' + srv.version + '/template/' + srv.name + '/config.json').then(function(resp) {
            srv.config = resp.data;
        });
    
        //getters
        srv.GetView = function() { return srv.host + '/' + srv.version + '/html/pivot.' + srv.view.layout + '.html'; }
        srv.GetObjects = function() { console.log(srv.search); return ((srv.search!=undefined || srv.filter!=undefined) ? srv.objects : srv.objects.slice(0,srv.view.properties.limit)); }
    
        //setters
        srv.SetSearch = function(obj) { srv.search = obj; }
        srv.SetFilter = function(obj) { srv.filter = obj; }
    
        //callback component functions
        srv.NavCallback = function(obj) { window.open(obj.path, obj.target); }
        srv.CellCallback = function(obj) { ctrl.SetObjects(obj.value); }
        srv.DropMenuCallback = function(obj) { window.open(obj.url,obj.target); }
        srv.SearchCallback = function(obj) { if(obj) { ctrl.SetObjects(obj.value.$); } else { ctrl.objects = undefined; } }
      });
  
  
  
  /** SERVICE COUCH - 1.0.0 ******************************************************/
  app.service('couchService', function ($http,$window,$q) {
    this.SetAttachments = function(doc) {
      var deferred = $q.defer();
      var fileInput = document.getElementById('uploads');
      if(fileInput != null) {
        var files = fileInput.files;
        if(files.length > 0) {
  
          //check that files do not exceed size limit
          var total_size = 0;
          for (var i = 0; i < files.length; i++) total_size = total_size + files[i].size;
  
          if(total_size < 10485760) { //less then 10MB
            var attachments = {};
            for (var i = 0; i < files.length; i++) { //for multiple files
              (function(file) {
                var name = file.name;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function(e) {
                  var dataUrl = reader.result;
                  var base64 = dataUrl.split(',')[1]; //this took all day!
                  attachments[name] = {};
                  attachments[name].content_type = file.type;
                  attachments[name].data = base64;
                  if(Object.keys(attachments).length == files.length) {
                    deferred.resolve({ok:attachments});
                  }
                };
                reader.onerror = function (error) {
                  console.log('Error: ', error);
                };
              })(files[i]);
            }
          } else {
            console.log({error:'Current file size exceeds 10MB.'});
            deferred.resolve({error:'Current file size exceeds 10MB.'});
          }
        } else {
          deferred.resolve(false);
        }
      } else {
        deferred.resolve(false);
      }
      return deferred.promise;
    }
  });
  
  
  /***
  *** DIRECTIVES
  ***/
  
  
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