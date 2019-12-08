/********************************************************************************
** ROUTER - 1.0.1 ***************************************************************
********************************************************************************/
app.config(['$routeProvider', '$sceDelegateProvider', function ($routeProvider, $sceDelegateProvider)
{
  $sceDelegateProvider.resourceUrlWhitelist(['self', app.webui.template.host + '**']);
  var templatePath = app.webui.template.host + '/' + app.webui.template.version + '/template/' + app.webui.template.name + '/index.html';
  $routeProvider
      .when('/', { templateUrl: templatePath, controller: 'appCtrl', controllerAs: 'ctrl' })
      .otherwise({ redirectTo: '/' });
}]);