//-- version 1.0.1 ---------------------------------------
app.service('intakeService', function ($q,$http,$filter)
{
  this.uri = "https://netservices.internal.ca/lib/TechnologyService.svc/json/kace/";
  this.header = {headers:{'Content-Type':'application/json'}};
  var srv = this;

  this.SetUser = function(obj) {
    srv.user = obj;
  }

  this.GetTickets = function() {
    var deferred = $q.defer();
    $http.get(srv.uri + "ticket", srv.header).then(function (response) {
      var objs = response.data.map(item => this.MapTicket(item));
      deferred.resolve(objs.sort());
    });
    return deferred.promise;
  }
  
  this.GetOptionsImpact = function() {
    var objs = [];
    var deferred = $q.defer();

    var uri = srv.uri + "impact";
    $http.get(uri, srv.header).then(function (response) {
      var resp = response.data.AllKaceImpactsResult;
      for(var i = 0; i < resp.length; i++) {
        var obj = {
          value: resp[i].ID,
          label: resp[i].NAME
        };
        objs.push(obj);
      }
      objs = $filter('orderBy')(objs, 'label', false);
      deferred.resolve(objs);
    });
    return deferred.promise;
  }

  this.GetOptionsLocation = function() {
    var objs = [];
    var deferred = $q.defer();

    var uri = srv.uri + "location";
    $http.get(uri, srv.header).then(function (response) {
      var resp = response.data.AllKaceLocationsResult;
      for(var i = 0; i < resp.length; i++) {
        var obj = {
          value: resp[i].NAME,
          label: resp[i].NAME
        };
        objs.push(obj);
      }
      objs = $filter('orderBy')(objs, 'label', false);
      deferred.resolve(objs);
    });
    return deferred.promise;
  }

  //LAN only
  this.PostServiceRequest = function(obj) {
    var deferred = $q.defer();

    //get submitter_id from NSL KACE user
    $http.get(srv.uri + "user/" + srv.user.user_name, obj, srv.header).then(function (response) {
      var user_id = response.data.KaceUserByUserAccountResult.ID;
      if(user_id != undefined) {
        var impact = parseInt(obj.RequestImpact);
        var data = {
          Tickets: [{
      			title: obj.RequestSummaryDescription,
            summary: obj.RequestSummary,
      			owner: 0,
      			custom_5: "Request",
            custom_9: "Intake Portal",
            custom_8: obj.RequestLocation,
            custom_11: "Regular Hours",
            custom_2: obj.RequestContactPhone,
            category: 69,
            impact: impact,
      			submitter: user_id,
      			hd_queue_id: 3
      		}
        ]};
        $http.post(srv.uri + "ticket", data, {headers:{'Content-Type':'text/plain'}}).then(function (resp) {
          console.log(resp);
          deferred.resolve(resp);
        });
      } else {
        deferred.resolve({Error:1,Message:"No user found in KACE database."});
      }
    });
    return deferred.promise;
  }

  //LAN only
  this.PostObject = function(obj) {
    var deferred = $q.defer();

    //get submitter_id from NSL KACE user
    $http.get(srv.uri + "user/" + srv.user.user_name, obj, srv.header).then(function (response) {
      var user_id = response.data.KaceUserByUserAccountResult.ID;
      if(user_id != undefined) {
        var impact = parseInt(obj.RequestImpact);
        var data = {
          Tickets: [{
      			title: obj.ServiceRequestType,
            summary: obj.Summary,
      			owner: 0,
      			custom_5: "Request",
            custom_9: "Intake Portal",
            custom_8: obj.Location,
            custom_11: "Regular Hours",
            custom_2: obj.ContactPhone,
            category: 69,
            impact: impact,
      			submitter: user_id,
      			hd_queue_id: 3
      		}
        ]};
        $http.post(srv.uri + "ticket", data, {headers:{'Content-Type':'text/plain'}}).then(function (resp) {
          console.log(resp);
          deferred.resolve(resp);
        });
      } else {
        deferred.resolve({Error:1,Message:"No user found in KACE database."});
      }
    });
    return deferred.promise;
  }

  this.MapTicket = function(obj) {
    return {
      id: obj.id,
      title: obj.title,
      created: obj.created,
      created: obj.modified,
      submitter: obj.submitter.full_name,
      owner: obj.owner.full_name,
      status: obj.status.name
    }
  }

});
