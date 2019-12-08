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
