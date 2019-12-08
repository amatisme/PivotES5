app.filter('SetTags', function () {
  return function (text) {
    if(!text) return text;
    var replacePattern1 = /#(\w*[a-zA-Z_]+\w*)/gim;
    var matches = String(text).match(replacePattern1);
    return matches;
  };
});
