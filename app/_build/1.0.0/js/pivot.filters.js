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