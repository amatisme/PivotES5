app.filter("DateObject", function() {
  return function (x) {
    if(!x) return false;
    return new Date(parseInt(x.substr(6)));
  };
});
