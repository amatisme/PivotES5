/** SERVICE NETSERVICES USER - 1.0.0 *******************************************/
app.service('userService', function ($q,$http)
{
  var srv = this;

  srv.GetObject = function(id) {
    var deferred = $q.defer();
    $http.get('https://netservices.internal.ca/lib/EmployeeService.svc/json/employee/employeeid/' + id.substr(id.length - 5), {headers:{'Content-Type':'application/json'}}).then(function (resp) {
      var obj = srv.MapUserObject(resp.data.EmployeeByEmployeeIdResult);
      deferred.resolve(obj);
    });
    return deferred.promise;
  }

  srv.MapUserObject = function(obj) {
    return {
      id: obj.PositionID,
      user_name: obj.UserName,
      first_name: obj.FirstName,
      last_name: obj.LastName,
      full_name: obj.FullName,
      work_email: obj.WorkEmail,
      work_phone: obj.WorkPhone,
      staff_email: obj.StaffEmail,
      reports_to_name: obj.ReportsToFirstName + " " + obj.ReportsToFirstName,
      reports_to_email: obj.ReportsToEmail,
      location: obj.LocationDescription,
      business_unit: obj.BusinessUnitDescription,
      associate_id: obj.AssociateID,
      employee_id: obj.EmployeeId
    };
  }
});