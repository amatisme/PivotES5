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
