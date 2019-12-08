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
