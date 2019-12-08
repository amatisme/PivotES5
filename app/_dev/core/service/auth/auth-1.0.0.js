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