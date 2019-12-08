app.filter('StripTags', ['$filter', '$sce',
  function ($filter, $sce) {
    return function (text) {
      if (!text) return text;
      var replacePattern1 = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
      return text.replace(replacePattern1, '$2');
    };
  }
]);
