app.service('jiraService', function ($q,$http,$filter)
{
  this.uri = "[YOUR_JIRA_API]";
  this.auth_token = "[YOUR_AUTH_TOKEN]";
  this.user;
  var srv = this;
  srv.limit = 100;

  this.SetUser = function(obj) {
    srv.user = obj;
  }

  this.GetEpics = function() {
    var deferred = $q.defer();
    $http.get(srv.uri + "&m=issue&key=PIR2&issuetype=Epic&auth=" + srv.auth_token, {headers:{'Content-Type':'text/plain'}}).then(function (response) {
      //model for stub component
      for(var i = 0; i < response.data.length; i++) {
        var obj = response.data[i];
        obj.id = undefined;
        obj.vertical = obj.meta.status;
        obj.detail = {
          status: obj.meta.status,
          owner: obj.owner,
          created:$filter('DynamicDate')(obj.meta.created)
        };
        response.data[i] = obj;
      }
      deferred.resolve(response.data);
    });
    return deferred.promise;
  }

  this.GetIncidents = function() {
    var deferred = $q.defer();
    $http.get(srv.uri + "&m=issue&key=SD&issuetype=Incident&auth=" + srv.auth_token, {headers:{'Content-Type':'text/plain'}}).then(function (response) {
      //model for stub component
      for(var i = 0; i < response.data.length; i++) {
        var obj = response.data[i];
        obj.id = undefined;
        obj.vertical = obj.meta.status;
        obj.detail = [
          obj.meta.status,
          obj.owner,
          $filter('DynamicDate')(obj.meta.created)
        ];
        response.data[i] = obj;
      }
      deferred.resolve(response.data);
    });
    return deferred.promise;
  }

  this.PostEpic = function(obj) {
    var deferred = $q.defer();

    obj.RequestDetails = 'Project Purpose: ' + obj.RequestPurpose + '\n';
    obj.RequestDetails+= 'Project Overview: ' + obj.RequestOverview + '\n';
    obj.RequestDetails+= 'Project Audience: ' + obj.RequestAudience;

    $http.post(srv.uri + "&m=issue&key=PIR2&issuetype=Epic&auth=" + srv.auth_token, obj, {headers:{'Content-Type':'text/plain'}}).then(function (response) {
      console.log(response);
      deferred.resolve(response);
    });
    return deferred.promise;
  }

  this.PostServiceRequest = function(obj) {
    var deferred = $q.defer();

    obj.RequestUser = srv.user;
    obj.RequestDetails = 'Summary: ' + obj.RequestSummary + '\n';
    obj.RequestDetails+= 'Location: ' + obj.RequestLocation + '\n';
    obj.RequestDetails+= 'Phone: ' + obj.RequestPhone + '\n';
    obj.RequestDetails+= 'Impact: ' + obj.RequestImpact;

    $http.post(srv.uri + "&m=issue&key=SD&issuetype=Incident&auth=" + srv.auth_token, obj, {headers:{'Content-Type':'text/plain'}}).then(function (response) {
      console.log(response);
      deferred.resolve(response);
    });
    return deferred.promise;
  }
});
