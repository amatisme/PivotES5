/***
*** SERVICES
***/


/** SERVICE NETSERVICES INTAKE - 1.0.1 *******************************************/
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
      var objs = response.data.AllKaceTicketsResult.map(item => {
        return {
          id: item.id,
          title: item.title,
          created: item.created,
          modified: item.modified,
          submitter: (item.submitter ? item.submitter.full_name : undefined),
          owner: (item.owner ? item.owner.full_name : undefined),
          status: item.status.name
        }
      });
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
});



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



/** SERVICE USER - 1.0.0 *******************************************************/
// app.service('userService', function ($q,$http)
// {
//   this.uri = 'https://netservices.internal.ca/lib/EmployeeService.svc/json/employee/employeeid/';
//   this.header = {headers:{'Content-Type':'application/json'}};

//   this.GetObject = function(id) {
//     var uri = this.uri + id.substr(id.length - 5); //last 5 of id
//     var header = this.header;
//     var deferred = $q.defer();

//     $http.get(uri, header).then(function (response) {
//       var obj = this.CreateUser(response.data.EmployeeByEmployeeIdResult);
//       deferred.resolve(obj);
//     });
//     return deferred.promise;
//   }

//   this.CreateUser = function(obj) {
//     var user = {};
//     user.id = obj.PositionID;
//     user.user_name = obj.UserName;
//     user.first_name = obj.FirstName;
//     user.last_name = obj.LastName;
//     user.full_name = obj.FullName;
//     user.work_email = obj.WorkEmail;
//     user.work_phone = obj.WorkPhone;
//     user.staff_email = obj.StaffEmail;
//     user.reports_to_name = obj.ReportsToFirstName + " " + obj.ReportsToFirstName;
//     user.reports_to_email = obj.ReportsToEmail;
//     user.location = obj.LocationDescription;
//     user.business_unit = obj.BusinessUnitDescription;
//     user.associate_id = obj.AssociateID;
//     user.employee_id = obj.EmployeeId;
//     return user;
//   }
// });



/***
*** COMPONENTS
***/



/** COMPONENT PAYMENT - 1.0.0 ***************************************************/
var payment_html = '';
payment_html += '<form name="form">';
payment_html += '<div id=paymentcomponent-pay data-ng-if=!paymentCtrl.submit>';
payment_html += '<label>Please Pay:</label><br>';
payment_html += '<span>{{paymentCtrl.amount | currency}}</span>';
payment_html += '</div>';

payment_html += '<!--Start Name on Card-->';
payment_html += '<div id=paymentcomponent-nameoncard>';
payment_html += '<label>Name on Card</label>';
payment_html += '<ul>';
payment_html += '<li>';
payment_html += '<input type="text" name="name_on_card" data-ng-model=paymentCtrl.data.name_on_card data-ng-required=true placeholder="FIRST MIDDLEINITIAL LAST">';
payment_html += '</li>';
payment_html += '<li>';
payment_html += '<i class="material-icons set" data-ng-if="paymentCtrl.data.name_on_card">done</i>';
payment_html += '<i class="material-icons unset" data-ng-if="!paymentCtrl.data.name_on_card">error_outline</i>';
payment_html += '</li>';
payment_html += '</ul>';
payment_html += '</div>';
payment_html += '<!--End Name on Card-->';

payment_html += '<!--Start Card Type-->';
payment_html += '<div id=paymentcomponent-cardtype data-ng-if="paymentCtrl.data.name_on_card">';
payment_html += '<label>Card Type</label>';
payment_html += '<ul>';
payment_html += '<li>';
payment_html += '<input type=radio name="card_type" value="visa" data-ng-model=paymentCtrl.data.card_type data-ng-change=paymentCtrl.SetPattern() data-ng-required=true>';
payment_html += '</li>';
payment_html += '<li><i class="fab fa-cc-visa"></i></li>';
payment_html += '<li style="padding-left:1em">';
payment_html += '<input type=radio name="card_type" value="mastercard" data-ng-model=paymentCtrl.data.card_type data-ng-change=paymentCtrl.SetPattern() data-ng-required=true>';
payment_html += '</li>';
payment_html += '<li style="width:100%;"><i class="fab fa-cc-mastercard"></i></li>';
payment_html += '<li style="padding-left:1em">';
payment_html += '<i class="material-icons set" data-ng-if="paymentCtrl.data.card_type">done</i>';
payment_html += '<i class="material-icons unset" data-ng-if="!paymentCtrl.data.card_type">error_outline</i>';
payment_html += '</li>';
payment_html += '</ul>';
payment_html += '</div>';
payment_html += '<!--End Card Type-->';

payment_html += '<!--Start Card Number-->';
payment_html += '<div id=paymentcomponent-cardnumber data-ng-if="paymentCtrl.data.name_on_card && paymentCtrl.data.card_type && paymentCtrl.pattern">';
payment_html += '<label>Card Number</label>';
payment_html += '<ul>';
payment_html += '<li>';
payment_html += '<input type="text" name="card_number" data-ng-model=paymentCtrl.data.card_number data-ng-pattern=paymentCtrl.pattern data-ng-required=true maxlength=16>';
payment_html += '</li>';
payment_html += '<li>';
payment_html += '<i class="material-icons set" data-ng-if="paymentCtrl.data.card_number">done</i>';
payment_html += '<i class="material-icons unset" data-ng-if="!paymentCtrl.data.card_number">error_outline</i>';
payment_html += '</li>';
payment_html += '</ul>';
payment_html += '</div>';
payment_html += '<!--End Card Number-->';

payment_html += '<!--Start Expiry Date-->';
payment_html += '<div data-ng-if="paymentCtrl.pattern && paymentCtrl.data.name_on_card && paymentCtrl.data.card_type && paymentCtrl.data.card_number">';
payment_html += '<label>Expiry date</label>';
payment_html += '<ul>';
payment_html += '<li>';
payment_html += '<input tiny type="text" name="expiry_month" title="Expiry Month" maxlength="2" placeholder="MM" data-ng-model=paymentCtrl.data.expiry_month>';
payment_html += '</li>';
payment_html += '<li>/</li>';
payment_html += '<li>';
payment_html += '<input tiny type="text" name="expiry_year" title="Expiry Year" maxlength="4" placeholder="YYYY" data-ng-model=paymentCtrl.data.expiry_year data-ng-change=paymentCtrl.ValidateExpiryDate() /> <!--REmember to remove this after test-->';
// payment_html += '<input tiny type="text" name="expiry_year" title="Expiry Year" maxlength="4" placeholder="YYYY" data-ng-model=paymentCtrl.data.expiry_year data-ng-change=paymentCtrl.ValidateExpiryDate() /> <!--REmember to remove this after test-->';
// payment_html += '<input type="hidden" name="valid_expiry_date" data-ng-model=paymentCtrl.valid_expiry_date data-ng-required=true />';
payment_html += '</li>';
payment_html += '<li>';
payment_html += '<i class="material-icons set" data-ng-if=paymentCtrl.valid_expiry_date>done</i>';
payment_html += '<i class="material-icons unset" data-ng-if=!paymentCtrl.valid_expiry_date>error_outline</i>';
payment_html += '</li>';
payment_html += '</ul>';
payment_html += '</div>';
payment_html += '<!--End Expiry Date-->';

payment_html += '<!--Start CVV-->';
payment_html += '<div id=paymentcomponent-cvv data-ng-if="paymentCtrl.pattern && paymentCtrl.data.name_on_card && paymentCtrl.data.card_type && paymentCtrl.data.card_number">';
payment_html += '<label>CVV</label>';
payment_html += '<ul>';
payment_html += '<li>';
payment_html += '<input tiny type="text" name="cvv" placeholder="123" data-ng-model=paymentCtrl.data.cvv data-ng-pattern="/^[0-9]{3,4}$/" data-ng-required=true maxlength=3>';
payment_html += '</li>';
payment_html += '<li>';
payment_html += '<i class="material-icons set" data-ng-if="paymentCtrl.data.cvv">done</i>';
payment_html += '<i class="material-icons unset" data-ng-if="!paymentCtrl.data.cvv">error_outline</i>';
payment_html += '</li>';
payment_html += '</ul>';
payment_html += '</div>';
payment_html += '<!--End CVV-->';

payment_html += '<button type="submit" data-ng-click=paymentCtrl.Submit() data-ng-if="form.$valid && !paymentCtrl.submit && !paymentCtrl.response">';
payment_html += '<ul>';
payment_html += '<li>Process Payment</li>';
payment_html += '<li><i class="material-icons">keyboard_arrow_right</i></li>';
payment_html += '</ul>';
payment_html += '</button>';

payment_html += '</div>';

payment_html += '<!--Start Process Response-->';
payment_html += '<ul data-ng-if="paymentCtrl.submit && !paymentCtrl.response">';
payment_html += '<li><img src="/milib/v/1.2/assets/ajax-loader.gif"></li>';
payment_html += '<li>Processing your payment...</li>';
payment_html += '</ul>';
payment_html += '<!--End Process Response-->';

payment_html += '<!--Start Callback Response-->';
payment_html += '<div data-ng-if="paymentCtrl.submit && paymentCtrl.response">';
payment_html += '<palette-dim class="ui-padding" data-ng-if=paymentCtrl.response.ok>';
payment_html += '<ul class="ui-table">';
payment_html += '<li><i class="material-icons">check</i></li>';
payment_html += '<li class="ui-stretch ui-padding-left">{{paymentCtrl.response.message}}</li>';
payment_html += '</ul>';
payment_html += '</palette-dim>';
payment_html += '<palette-alert class="ui-padding" data-ng-if=paymentCtrl.response.error>';
payment_html += '<ul class="ui-table">';
payment_html += '<li><i class="material-icons">error_outline</i></li>';
payment_html += '<li class="ui-stretch ui-padding-left">{{paymentCtrl.response.message}}</li>';
payment_html += '</ul>';
payment_html += '</palette-alert>';
payment_html += '</div>';
payment_html += '<!--End Callback Response-->';
payment_html += '{{paymentCtrl.data.$valid}}';
payment_html += '</form>';

var payment_css = '';
payment_css += '<link href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" rel="stylesheet">';
payment_css += '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
payment_css += '<style>';
payment_css += 'payment-component * { margin:0; padding:0; }';
payment_css += 'payment-component { display: block; position: relative; padding: 1em; background-color: WHITESMOKE; }';
payment_css += 'payment-component ul { display: table; }';
payment_css += 'payment-component ul li { display: table-cell; vertical-align: middle; }';
payment_css += 'payment-component > form > div { margin-bottom: 1em; padding: .5em 0; border-bottom: 1px solid RGB(0,0,0); }';
payment_css += 'payment-component > form > div > label { font-weight: 600; margin-bottom:.2em; }';
payment_css += 'payment-component > form > div > ul > li:last-child { width: 100%; text-align: right; }';
payment_css += 'payment-component > form > div#paymentcomponent-pay > span { font-size:3em; }';
payment_css += 'payment-component > form > button { padding: 0 1em; }';
payment_css += 'payment-component [tiny] { width: 36px; }';
payment_css += '</style>';

function PaymentComponentCtrl($timeout)
{
  var paymentCtrl = this;
  // paymentCtrl.data = {};
  // paymentCtrl.response = undefined;
  paymentCtrl.submit = undefined;

  //Start Testing Data
  paymentCtrl.data = {
    name_on_card: "John Doe",
    card_type: "visa",
    card_number: 4242424242424,
    cvv: 123,
    expiry_month: 12,
    expiry_year: 2019
  }
  paymentCtrl.pattern = "^4[0-9]{12}(?:[0-9]{3})?$";
  paymentCtrl.valid_expiry_date = true;
  //End Testing Data

  paymentCtrl.SetPattern = function() {
    if(paymentCtrl.data.card_type == 'visa') paymentCtrl.pattern = "^4[0-9]{12}(?:[0-9]{3})?$";
    if(paymentCtrl.data.card_type == 'mastercard') paymentCtrl.pattern = "^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$";
  }

  paymentCtrl.ValidateExpiryDate = function() {
    paymentCtrl.valid_expiry_date = undefined;
    var today = new Date();
    var comparison = new Date(paymentCtrl.data.expiry_year  + '-' + paymentCtrl.data.expiry_month + '-' + today.getDate());
    today.setHours(0,0,0,0);
    comparison.setHours(0,0,0,0);
    paymentCtrl.valid_expiry_date = (comparison >= today ? true : undefined);
  }

  paymentCtrl.Submit = function() {
    paymentCtrl.submit = true;

    paymentCtrl.data.amount = paymentCtrl.amount;
    console.log(paymentCtrl.data);

    //simulates payment
    paymentCtrl.StartTimer(1);

    // $http.get('https://netservices.internal.ca/lib/EmployeeService.svc/json/employee').then(function(response) {
    //   paymentCtrl.response = response.data.ActiveEmployeesResult[0];
    //   if(response.ok) paymentCtrl.callbackFn({obj:paymentCtrl.response});
    // });
  }

  //ui testing
  paymentCtrl.StartTimer = function(time) {
    var timer = function() {
      time = time - 1;
      $timeout(timer, 1000);
    }
    $timeout(timer, 1000);

    //after (time) seconds destroy attempt
    $timeout( function(){
      //construct object to return for testing
      paymentCtrl.response = {
        ok: true,
        message: "Payment Recieved."
      };
      if(paymentCtrl.response.ok) paymentCtrl.callbackFn({obj:paymentCtrl.response});
    }, (time * 1000) );
  }
}
const paymentComponent = {
  controller: PaymentComponentCtrl,
  controllerAs: 'paymentCtrl',
  bindings: {
    callbackFn: '&?',
    object: '=',
    amount: '<',
    form: '='
  },
  template: payment_css + payment_html
};
angular.module('app').component('paymentComponent', paymentComponent);


/** COMPONENT NETSERVICE SEARCHADDRESS - 1.0.0 *********************************/
var searchaddress_html = '';
searchaddress_html += '<ul>';
searchaddress_html += '<li>';
searchaddress_html += '<input autofocus type=text placeholder="Street Name" data-ng-model=searchaddressCtrl.query data-ng-change=searchaddressCtrl.Callback() data-ng-model-options="{debounce: 1000}">';
searchaddress_html += '</li>';
searchaddress_html += '</ul>';

var searchaddress_css = '';
searchaddress_css += '<style>';
searchaddress_css += 'searchaddress-component * { margin:0; padding:0; }';
searchaddress_css += 'searchaddress-component { display: block; position: relative; }';
searchaddress_css += 'searchaddress-component > ul { display: table; width: 100%; padding: 1em 0; border-bottom-style: solid; border-bottom-width: 1px; }';
searchaddress_css += 'searchaddress-component > ul > li { display: table-cell; }';
searchaddress_css += '</style>';

function searchaddressComponentCtrl($http) {
  var searchaddressCtrl = this;

  searchaddressCtrl.$onInit = function() {
    searchaddressCtrl.query = undefined;
  }

  searchaddressCtrl.Callback = function() {
    var uri = 'https://netservices.internal.ca/lib/AddressService.svc/json/';
    switch(searchaddressCtrl.type) {
      case "property":
        uri+= 'address/special/';
        break;
      case "special":
        uri+= 'property';
        break;
    }
    if(searchaddressCtrl.query.length > 2) {
      $http.get(uri + searchaddressCtrl.query).then(function(resp) {
        switch(searchaddressCtrl.type) {
          case "property":
            searchaddressCtrl.MapPropertyObject(resp.data);
            break;
          case "special":
            searchaddressCtrl.MapSpecialObject(resp.data);
            break;
        }
        searchaddressCtrl.callbackFn({obj:resp});
      });
    }
  }

  searchaddressCtrl.MapSpecialObject = function(objs) {
    selectaddressCtrl.object = objs.SpecialCollectionAddressesByStreetResult.map(item => {
      return {
        label: item.ADDRESS,
        properties: item
      };
    }).sort();
  }

  searchaddressCtrl.MapPropertyObject = function(objs) {
    selectaddressCtrl.object = objs.AllPropertiesResult.map(item => {
      return {
        label: item.MAILING1,
        properties: item
      };
    }).sort();
  }
}
const searchaddressComponent = {
  controller: searchaddressComponentCtrl,
  controllerAs: 'searchaddressCtrl',
  bindings: {
    callbackFn: '&',
    label: '<?'
  },
  template: searchaddress_css + searchaddress_html
};
angular.module('app').component('searchaddressComponent', searchaddressComponent);



/** COMPONENT SEARCHEMPLOYEE - 1.0.0 ********************************************/
var searchemployee_html = '';
searchemployee_html += '<fieldset>';
searchemployee_html += '<legend data-ng-if=searchemployeeCtrl.label>{{searchemployeeCtrl.label}}</legend>';
searchemployee_html += '<ul>';
searchemployee_html += '<li>';
searchemployee_html += '<input autofocus type=text placeholder="Keyword" data-ng-model=searchemployeeCtrl.query data-ng-change=searchemployeeCtrl.Callback() data-ng-model-options="{debounce: 1000}">';
searchemployee_html += '</li>';
searchemployee_html += '</ul>';
searchemployee_html += '</fieldset>';

var searchemployee_css = '';
searchemployee_css += '<style>';
searchemployee_css += 'searchemployee-component * { margin:0; padding:0; }';
searchemployee_css += 'searchemployee-component { display: block; position: relative; }';
searchemployee_css += 'searchemployee-component > ul { display: table; width: 100%; padding: 1em 0; border-bottom-style: solid; border-bottom-width: 1px; }';
searchemployee_css += 'searchemployee-component > ul > li { display: table-cell; }';
searchemployee_css += '</style>';

function SearchEmployeeComponentCtrl($http,$filter) {
  var searchemployeeCtrl = this;

  searchemployeeCtrl.$onInit = function() {
    searchemployeeCtrl.query = undefined;
  }

  searchemployeeCtrl.Callback = function() {
    if(searchemployeeCtrl.query.length > 2) {
      $http.get('https://netservices.internal.ca/lib/EmployeeService.svc/json/employee').then(function(response) {
        var resp = response.data.ActiveEmployeesResult;
        resp = $filter('filter')(resp, searchemployeeCtrl.query);
        searchemployeeCtrl.callbackFn({obj:resp});
      });
    }
  }
}
const searchemployeeComponent = {
  controller: SearchEmployeeComponentCtrl,
  controllerAs: 'searchemployeeCtrl',
  bindings: {
    callbackFn: '&',
    label: '<?'
  },
  template: searchemployee_css + searchemployee_html
};
angular.module('app').component('searchemployeeComponent', searchemployeeComponent);


/** COMPONENT SEARCHENQUIRY - 1.0.0 ********************************************/
var searchenquiry_html = '';
searchenquiry_html += '<fieldset>';
searchenquiry_html += '<legend data-ng-if=searchenquiryCtrl.label>{{searchenquiryCtrl.label}}</legend>';
searchenquiry_html += '<ul>';
searchenquiry_html += '<li>';
searchenquiry_html += '<select name=category data-ng-model=searchenquiryCtrl.category data-ng-change=searchenquiryCtrl.SetCategory(searchenquiryCtrl.category)>';
searchenquiry_html += '<option value="">Select</option>';
searchenquiry_html += '<option value="{{each.value}}" data-ng-selected="{{each == searchenquiryCtrl.category}}" data-ng-repeat="each in searchenquiryCtrl.options">{{each.label}}</option>';
searchenquiry_html += '</select>';
searchenquiry_html += '</li>';
searchenquiry_html += '<li data-ng-if=searchenquiryCtrl.category>';
searchenquiry_html += '<input autofocus type=text placeholder="Keyword" data-ng-model=searchenquiryCtrl.query data-ng-change=searchenquiryCtrl.Callback() data-ng-model-options="{debounce: 1000}">';
searchenquiry_html += '</li>';
searchenquiry_html += '</ul>';
searchenquiry_html += '</fieldset>';

var searchenquiry_css = '';
searchenquiry_css += '<style>';
searchenquiry_css += 'searchenquiry-component * { margin:0; padding:0; }';
searchenquiry_css += 'searchenquiry-component { display: block; position: relative; }';
searchenquiry_css += 'searchenquiry-component > ul { display: table; width: 100%; padding: 1em 0; border-bottom-style: solid; border-bottom-width: 1px; }';
searchenquiry_css += 'searchenquiry-component > ul > li { display: table-cell; }';
searchenquiry_css += 'searchenquiry-component > ul > li:last-child { width: 100%; }';
searchenquiry_css += '</style>';

function SearchEnquiryComponentCtrl($http,$filter) {
  var searchenquiryCtrl = this;

  searchenquiryCtrl.$onInit = function() {
    searchenquiryCtrl.query = undefined;
    searchenquiryCtrl.options = [
      {value:'pothole',label:'Pot Holes'},
      {value:'culvert',label:'Culverts'}
    ];
  }

  searchenquiryCtrl.SetCategory = function(str) {
    searchenquiryCtrl.category = str;
  }

  searchenquiryCtrl.Callback = function() {
    if(searchenquiryCtrl.query.length > 2) {
      $http.get('https://netservices.internal.ca//lib/vendor/CityworksService.svc/json/' + searchenquiryCtrl.category).then(function(response) {
        var resp = response.data.GetCityworksRequestsResult;
        resp = $filter('filter')(resp, searchenquiryCtrl.query);
        searchenquiryCtrl.callbackFn({obj:resp});
      });
    }
  }
}
const searchenquiryComponent = {
  controller: SearchEnquiryComponentCtrl,
  controllerAs: 'searchenquiryCtrl',
  bindings: {
    callbackFn: '&',
    label: '<?'
  },
  template: searchenquiry_css + searchenquiry_html
};
angular.module('app').component('searchenquiryComponent', searchenquiryComponent);



/** COMPONENT NETSERVICES SEARCHENQUIRYPLANNING - 1.0.0 ************************/
var searchenquiryplanning_html = '';
searchenquiryplanning_html += '<label data-ng-if=searchenquiryplanningCtrl.label>{{searchenquiryplanningCtrl.label}}</label>';
searchenquiryplanning_html += '<ul>';
searchenquiryplanning_html += '<li>';
searchenquiryplanning_html += '<input autofocus type=text placeholder="Keyword" data-ng-model=searchenquiryplanningCtrl.query data-ng-change=searchenquiryplanningCtrl.Callback() data-ng-model-options="{debounce: 1000}">';
searchenquiryplanning_html += '<span>{{searchenquiryplanningCtrl.submit.count}}</span>';
searchenquiryplanning_html += '<button data-ng-if=searchenquiryplanningCtrl.submit data-ng-click=searchenquiryplanningCtrl.Clear()><i class="material-icons">cancel</i></button>';
searchenquiryplanning_html += '<button data-ng-if=!searchenquiryplanningCtrl.submit data-ng-click=searchenquiryplanningCtrl.Callback()><i class="material-icons" title="Show All">visibility</i></button>';
searchenquiryplanning_html += '</li>';
searchenquiryplanning_html += '</ul>';

var searchenquiryplanning_css = '';
searchenquiryplanning_css += '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
searchenquiryplanning_css += '<style>';
searchenquiryplanning_css += 'searchenquiryplanning-component * { margin:0; padding:0; }';
searchenquiryplanning_css += 'searchenquiryplanning-component { display: block; position: relative; }';
searchenquiryplanning_css += 'searchenquiryplanning-component > ul { display: table; width: 100%; padding: 1em 0; border-bottom-style: solid; border-bottom-width: 1px; }';
searchenquiryplanning_css += 'searchenquiryplanning-component > ul > li { display: table-cell; white-space: nowrap; }';
searchenquiryplanning_css += 'searchenquiryplanning-component > ul > li:last-child { width: 100%; }';
searchenquiryplanning_css += 'searchenquiryplanning-component > ul > li:last-child > span { padding: 0 1em; }';
searchenquiryplanning_css += '</style>';

function SearchEnquiryPlanningComponentCtrl($http,$filter) {
  var searchenquiryplanningCtrl = this;

  searchenquiryplanningCtrl.$onInit = function() {
    searchenquiryplanningCtrl.query = undefined;
    searchenquiryplanningCtrl.options = [
      {value:'pothole',label:'Pot Holes'},
      {value:'culvert',label:'Culverts'}
    ];
  }

  searchenquiryplanningCtrl.SetCategory = function(str) {
    searchenquiryplanningCtrl.category = str;
  }

  searchenquiryplanningCtrl.Clear = function() {
    searchenquiryplanningCtrl.submit = undefined;
    searchenquiryplanningCtrl.query = undefined;
    searchenquiryplanningCtrl.callbackFn({obj:undefined});
  }

  searchenquiryplanningCtrl.Callback = function() {
    // if(searchenquiryplanningCtrl.query.length > 2) {
    $http.get('https://netservices.internal.ca/lib/OrganizationService.svc/json/azservice').then(function(response) {
      var objs = response.data.AllAZServicesResult;
      if(searchenquiryplanningCtrl.query && searchenquiryplanningCtrl.query.length > 2) {
        objs = $filter('filter')(objs, searchenquiryplanningCtrl.query);
      }
      var resp = {
        count: objs.length,
        query: searchenquiryplanningCtrl.query,
        data: objs
      }
      searchenquiryplanningCtrl.callbackFn({obj:resp});
      searchenquiryplanningCtrl.submit = {count:resp.count}
    });
    // }
  }
}
const searchenquiryplanningComponent = {
  controller: SearchEnquiryPlanningComponentCtrl,
  controllerAs: 'searchenquiryplanningCtrl',
  bindings: {
    callbackFn: '&',
    label: '<?'
  },
  template: searchenquiryplanning_css + searchenquiryplanning_html
};
angular.module('app').component('searchenquiryplanningComponent', searchenquiryplanningComponent);



/** COMPONENT SEARCHPROCUREMENT - 1.0.0 ****************************************/
var searchprocurement_html = '';
searchprocurement_html += '<fieldset>';
searchprocurement_html += '<legend data-ng-if=searchprocurementCtrl.label>{{searchprocurementCtrl.label}}</legend>';
searchprocurement_html += '<ul>';
searchprocurement_html += '<li>';
searchprocurement_html += '<input autofocus type=text placeholder="Keyword" data-ng-model=searchprocurementCtrl.query data-ng-change=searchprocurementCtrl.Callback() data-ng-model-options="{debounce: 1000}">';
searchprocurement_html += '</li>';
searchprocurement_html += '</ul>';
searchprocurement_html += '</fieldset>';

var searchprocurement_css = '';
searchprocurement_css += '<style>';
searchprocurement_css += 'searchprocurement-component { display: block; position: relative; }';
searchprocurement_css += 'searchprocurement-component > ul { display: table; width: 100%; padding: 1em 0; border-bottom-style: solid; border-bottom-width: 1px; }';
searchprocurement_css += 'searchprocurement-component > ul > li { display: table-cell; }';
searchprocurement_css += '</style>';

function SearchProcurementComponentCtrl($http,$filter) {
  var searchprocurementCtrl = this;

  searchprocurementCtrl.$onInit = function() {
    searchprocurementCtrl.query = undefined;
  }

  searchprocurementCtrl.Callback = function() {
    if(searchprocurementCtrl.query.length > 2) {
      $http.get('https://netservices.internal.ca/lib/cos/PurchasingProjectService.svc/json/project').then(function(response) {
        var resp = response.data;
        resp = $filter('filter')(resp, searchprocurementCtrl.query);
        searchprocurementCtrl.callbackFn({obj:resp});
      });
    }
  }
}
const searchprocurementComponent = {
  controller: SearchProcurementComponentCtrl,
  controllerAs: 'searchprocurementCtrl',
  bindings: {
    callbackFn: '&',
    label: '<?'
  },
  template: searchprocurement_css + searchprocurement_html
};
angular.module('app').component('searchprocurementComponent', searchprocurementComponent);


/** COMPONENT NETSERVICES SELECTASSOCIATE - 1.0.0 ******************************/
var selectassociate_html = '';
selectassociate_html += '<fieldset>';
selectassociate_html += '<legend data-ng-if=selectassociateCtrl.label>{{selectassociateCtrl.label}}</legend>';
selectassociate_html += '<ul>';
selectassociate_html += '<li>';
selectassociate_html += '<select name=select-associate data-ng-model=selectassociateCtrl.object data-ng-required=selectassociateCtrl.required data-ng-options="each as each.FullName for each in selectassociateCtrl.objects" data-ng-change=selectassociateCtrl.callback(selectassociateCtrl.object)>';
selectassociate_html += '<option value="">Please Select</option>';
selectassociate_html += '</select>';
selectassociate_html += '</li>';
selectassociate_html += '<li data-ng-if="selectassociateCtrl.required">';
selectassociate_html += '<i class="material-icons set" data-ng-if="selectassociateCtrl.object">done</i>';
selectassociate_html += '<i class="material-icons unset" data-ng-if="!selectassociateCtrl.object">error_outline</i>';
selectassociate_html += '</li>';
selectassociate_html += '</ul>';
selectassociate_html += '</fieldset>';

var selectassociate_css = '';
selectassociate_css += '<style type="text/css">';
selectassociate_css += 'selectassociate-component { display: block; position: relative; width: 100%; }';
selectassociate_css += 'selectassociate-component > fieldset > ul { display: table; width:100%; }';
selectassociate_css += 'selectassociate-component > fieldset > ul > li { display: table-cell; }';
selectassociate_css += 'selectassociate-component > fieldset > ul > li:first-child { width: 100%; }';
selectassociate_css += '</style>';

function selectassociateCtrl($http)
{
  var selectassociateCtrl = this;

  selectassociateCtrl.$onInit = function() {
    var uri = 'https://netservices.internal.ca/lib/EmployeeService.svc/json/employee';

    //methods include union,nonunion,management
    if(selectassociateCtrl.method) {
      $http.get(uri + '/' + selectassociateCtrl.method).then(function(response) { selectassociateCtrl.objects = response.data; });
    } else {
      $http.get(uri).then(function(response) { selectassociateCtrl.objects = response.data.ActiveEmployeesResult; });
    }
  }

  selectassociateCtrl.callback = function(obj) {
    if(selectassociateCtrl.callbackFn != undefined) selectassociateCtrl.callbackFn({obj:obj});
  }
}

const selectassociateComponent = {
  controller: selectassociateCtrl,
  controllerAs: 'selectassociateCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    disabled: '<?',
    required: '<',
    method: '<?',
    object: '='
  },
  template: selectassociate_css + selectassociate_html
};

angular.module('app').component('selectassociateComponent', selectassociateComponent);



/** COMPONENT NETSERVICES SELECTASSOCIATEEMAIL - 1.0.0 *************************/
var selectassociateemail_html = '';
selectassociateemail_html += '<fieldset>';
selectassociateemail_html += '<legend data-ng-if=selectassociateemailCtrl.label>{{selectassociateemailCtrl.label}}</legend>';
selectassociateemail_html += '<ul>';
selectassociateemail_html += '<li>';
selectassociateemail_html += '<input type=hidden data-ng-model=selectassociateemailCtrl.object data-ng-required=selectassociateemailCtrl.required />';
selectassociateemail_html += '<select name=selectassociateemail data-ng-model=selectassociateemailCtrl.email data-ng-options="each as each.label for each in selectassociateemailCtrl.options" data-ng-change=selectassociateemailCtrl.SetObject()>';
selectassociateemail_html += '<option value="">Please Select</option>';
selectassociateemail_html += '</select>';
selectassociateemail_html += '</li>';
selectassociateemail_html += '<li width=1% data-ng-if="selectassociateemailCtrl.required && !selectassociateemailCtrl.disabled">';
selectassociateemail_html += '<i class="material-icons set" data-ng-if="selectassociateemailCtrl.object">done</i>';
selectassociateemail_html += '<i class="material-icons unset" data-ng-if="!selectassociateemailCtrl.object">error_outline</i>';
selectassociateemail_html += '</li>';
selectassociateemail_html += '</ul>';
selectassociateemail_html += '<div data-ng-if=selectassociateemailCtrl.object>';
selectassociateemail_html += '<ul class=item data-ng-repeat="each in selectassociateemailCtrl.object">';
selectassociateemail_html += '<li><span><nobr>{{each.label}}</nobr></span></li>';
selectassociateemail_html += '<li><button type=button data-ng-click=selectassociateemailCtrl.RemoveObject(each)>Remove</button></li>';
selectassociateemail_html += '</ul>';
selectassociateemail_html += '</div>';
selectassociateemail_html += '</fieldset>';

var selectassociateemail_css = '';
selectassociateemail_css += '<style type="text/css">';
selectassociateemail_css += 'selectassociateemail-component { display: block; position: relative; width: 100%; }';
selectassociateemail_css += 'selectassociateemail-component > fieldset ul { display: table; width:100%; }';
selectassociateemail_css += 'selectassociateemail-component > fieldset ul li { display: table-cell; }';
selectassociateemail_css += 'selectassociateemail-component > fieldset > ul > li:first-child { width: 100%; }';
selectassociateemail_css += 'selectassociateemail-component > fieldset > div { padding: .5rem 1rem; }';
selectassociateemail_css += 'selectassociateemail-component > fieldset > div > ul > li:last-child { width: 100%; padding-left: 1rem; text-align: right; }';
selectassociateemail_css += '</style>';

function selectassociateemailCtrl($http)
{
  var selectassociateemailCtrl = this;
  
  selectassociateemailCtrl.$onInit = function() {
    var uri = 'https://netservices.internal.ca/lib/EmployeeService.svc/json/employee';
    $http.get(uri).then(function(resp) { 
        selectassociateemailCtrl.options = resp.data.ActiveEmployeesResult.map(item => {
            return {
                label: item.WorkEmail,
                value: item
            };
        }).filter(item => item.value.UserName).sort();
    });
  }

  selectassociateemailCtrl.SetObject = function() {
    if(!selectassociateemailCtrl.multiple) {
        selectassociateemailCtrl.object = selectassociateemailCtrl.email;
        selectassociateemailCtrl.callback();
    } else {
      //remove item from options
      selectassociateemailCtrl.options = selectassociateemailCtrl.options.filter(item => item !== selectassociateemailCtrl.email).sort();
      //add item to object
      selectassociateemailCtrl.AddObject();
      selectassociateemailCtrl.callback();
    }
  }

  selectassociateemailCtrl.AddObject = function() {
    if(!selectassociateemailCtrl.emails) selectassociateemailCtrl.emails = [];
    selectassociateemailCtrl.emails.push(selectassociateemailCtrl.email);
    selectassociateemailCtrl.email = undefined;
    selectassociateemailCtrl.object = selectassociateemailCtrl.emails;
  }

  selectassociateemailCtrl.RemoveObject = function(obj) {
    //Adding item back to options
    selectassociateemailCtrl.options.push(obj);
    //removing item from object
    selectassociateemailCtrl.emails = selectassociateemailCtrl.emails.filter(item => item !== obj);
    if(selectassociateemailCtrl.emails.length != 0) {
        selectassociateemailCtrl.object = selectassociateemailCtrl.emails;
    } else {
        selectassociateemailCtrl.emails = undefined;
      selectassociateemailCtrl.object = undefined;
    }
  }

  selectassociateemailCtrl.callback = function() {
    if(selectassociateemailCtrl.callbackFn != undefined) selectassociateemailCtrl.callbackFn({obj:selectassociateemailCtrl.object.value});
  }
}
const selectassociateemailComponent = {
  controller: selectassociateemailCtrl,
  controllerAs: 'selectassociateemailCtrl',
  bindings: {
    callbackFn: '&?',
    object: '=',
    label: '<',
    disabled: '<?',
    required: '<',
    multiple: '<?'
  },
  template: selectassociateemail_css + selectassociateemail_html
};
angular.module('app').component('selectassociateemailComponent', selectassociateemailComponent);



/** COMPONENT NETSERVICES SELECTAUDIENCE - 1.0.0 *******************************/
var selectaudience_html = '';
selectaudience_html += '<fieldset>';
selectaudience_html += '<legend data-ng-if=selectaudienceCtrl.label>{{selectaudienceCtrl.label}}</legend>';
selectaudience_html += '<ul>';
selectaudience_html += '<li>';
selectaudience_html += '<select name=selectaudience data-ng-model=selectaudienceCtrl.object data-ng-required=selectaudienceCtrl.required data-ng-disabled=selectaudienceCtrl.disabled data-ng-change=selectaudienceCtrl.callback(selectaudienceCtrl.object)>';
selectaudience_html += '<option value="">Select</option>';
selectaudience_html += '<option value="{{each}}" data-ng-selected="{{each == selectaudienceCtrl.object}}" data-ng-repeat="each in selectaudienceCtrl.options">{{each.label}}</option>';
selectaudience_html += '</select>';
selectaudience_html += '</li>';
selectaudience_html += '<li data-ng-if="selectaudienceCtrl.required && !selectaudienceCtrl.disabled">';
selectaudience_html += '<i class="material-icons set" data-ng-if="selectaudienceCtrl.object">done</i>';
selectaudience_html += '<i class="material-icons unset" data-ng-if="!selectaudienceCtrl.object">error_outline</i>';
selectaudience_html += '</li>';
selectaudience_html += '</ul>';
selectaudience_html += '</fieldset>';

var selectaudience_css = '';
selectaudience_css += '<style>';
selectaudience_css += 'selectaudience-component { display: block; position: relative; }';
selectaudience_css += 'selectaudience-component > fieldset > ul { display: table; width:100%; }';
selectaudience_css += 'selectaudience-component > fieldset > ul > li { display: table-cell; }';
selectaudience_css += 'selectaudience-component > fieldset > ul > li:first-child { width: 100%; }';
selectaudience_css += '</style>';

function selectaudienceCtrl($http)
{
  var selectaudienceCtrl = this;

  selectaudienceCtrl.$onInit = function() {
    $http.get('https://netservices.internal.ca/lib/ProjectService.svc/json/project/audience').then(function(response) {
      var data = response.data;
      selectaudienceCtrl.options = data.map(function(obj) {
        return {
          id:obj.AudienceID,
          label:obj.Label,
          value:obj.Value
        }});
    });
  }
  selectaudienceCtrl.callback = function(obj) {
    if(selectaudienceCtrl.callbackFn !=undefined) selectaudienceCtrl.callbackFn({obj:obj});
  }
}
const selectaudienceComponent = {
  controller: selectaudienceCtrl,
  controllerAs: 'selectaudienceCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    disabled: '<?',
    required: '<'
  },
  template: selectaudience_css + selectaudience_html
};
angular.module('app').component('selectaudienceComponent', selectaudienceComponent);




/** COMPONENT NETSERVICES SELECTBUSINESSUNIT - 1.0.0 ***************************/
var selectbusinessunit_html = '';
selectbusinessunit_html += '<fieldset>';
selectbusinessunit_html += '<legend data-ng-if=selectbusinessunitCtrl.label>{{selectbusinessunitCtrl.label}}</legend>';
selectbusinessunit_html += '<ul>';
selectbusinessunit_html += '<li>';
selectbusinessunit_html += '<select name=select-businessunit data-ng-options="each as each.label for each in selectbusinessunitCtrl.options" data-ng-model=selectbusinessunitCtrl.object data-ng-required=selectbusinessunitCtrl.required data-ng-disabled=selectbusinessunitCtrl.disabled data-ng-change=selectbusinessunitCtrl.Callback(selectbusinessunitCtrl.object)>';
selectbusinessunit_html += '<option value="">Select</option>';
selectbusinessunit_html += '</select>';
selectbusinessunit_html += '</li>';
selectbusinessunit_html += '<li data-ng-if="selectbusinessunitCtrl.required && !selectbusinessunitCtrl.disabled">';
selectbusinessunit_html += '<i class="material-icons set" data-ng-if="selectbusinessunitCtrl.object">done</i>';
selectbusinessunit_html += '<i class="material-icons unset" data-ng-if="!selectbusinessunitCtrl.object">error_outline</i>';
selectbusinessunit_html += '</li>';
selectbusinessunit_html += '</ul>';
selectbusinessunit_html += '</fieldset>';

var selectbusinessunit_css = '';
selectbusinessunit_css += '<style>';
selectbusinessunit_css += 'selectbusinessunit-component { display: block; position: relative; }';
selectbusinessunit_css += 'selectbusinessunit-component > fieldset > ul { display: table; width:100%; }';
selectbusinessunit_css += 'selectbusinessunit-component > fieldset > ul > li { display: table-cell; }';
selectbusinessunit_css += 'selectbusinessunit-component > fieldset > ul > li:first-child { width: 100%; }';
selectbusinessunit_css += '</style>';

function SelectBusinessUnitComponentCtrl ($http)
{
  var selectbusinessunitCtrl = this;

  selectbusinessunitCtrl.$onInit = function() {
    selectbusinessunitCtrl.options = [];
    $http.get('https://netservices.internal.ca/lib/OrganizationService.svc/json/businessunit').then(function(response) {
      selectbusinessunitCtrl.options = response.data.AllWhitbyBusinessUnitsResult.map(item => {
        return {
          label: item.BusinessUnitDescription,
          value: item
        };
      }).sort();

      if(selectbusinessunitCtrl.value) {
        selectbusinessunitCtrl.object = selectbusinessunitCtrl.options.filter(item => item.label == selectbusinessunitCtrl.value)[0];
      }
    });
  }

  selectbusinessunitCtrl.Callback = function(obj) {
    if(selectbusinessunitCtrl.callbackFn != undefined) selectbusinessunitCtrl.callbackFn({obj:obj});
  }
}
const selectbusinessunitComponent = {
  controller: SelectBusinessUnitComponentCtrl,
  controllerAs: 'selectbusinessunitCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<?',
    disabled: '<?',
    value: "<?",
    required: '<'
  },
  template: selectbusinessunit_css + selectbusinessunit_html
};
angular.module('app').component('selectbusinessunitComponent', selectbusinessunitComponent);



/** COMPONENT NETSERVICE SELECTEMPLOYEE - 1.0.0 ********************************/
var selectemployee_html = '';
selectemployee_html += '<fieldset>';
selectemployee_html += '<legend data-ng-if=selectemployeeCtrl.label>{{selectemployeeCtrl.label}}</legend>';
selectemployee_html += '<ul>';
selectemployee_html += '<li>';
selectemployee_html += '<select name=selectemployee data-ng-model=selectemployeeCtrl.object data-ng-required=selectemployeeCtrl.required data-ng-disabled=selectemployeeCtrl.disabled data-ng-change=selectemployeeCtrl.Callback(selectemployeeCtrl.object)>';
selectemployee_html += '<option value="">Select</option>';
selectemployee_html += '<option value="{{each}}" data-ng-selected="{{each == selectemployeeCtrl.object}}" data-ng-repeat="each in selectemployeeCtrl.options">{{each.FullName}}</option>';
selectemployee_html += '</select>';
selectemployee_html += '</li>';
selectemployee_html += '<li data-ng-if="selectemployeeCtrl.required && !selectemployeeCtrl.disabled">';
selectemployee_html += '<i class="material-icons set" data-ng-if="selectemployeeCtrl.object">done</i>';
selectemployee_html += '<i class="material-icons unset" data-ng-if="!selectemployeeCtrl.object">error_outline</i>';
selectemployee_html += '</li>';
selectemployee_html += '</ul>';
selectemployee_html += '</fieldset>';

var selectemployee_css = '';
selectemployee_css += '<style>';
selectemployee_css += 'selectemployee-component { display: block; position: relative; }';
selectemployee_css += 'selectemployee-component > ul { display: table; width: 100%; }';
selectemployee_css += 'selectemployee-component > ul > li { display: table-cell; }';
selectemployee_css += 'selectemployee-component > ul > li:first-child { width: 100%; }';
selectemployee_css += '</style>';

function SelectEmployeeCtrl($http)
{
  var selectemployeeCtrl = this;
  //PROTOCOL METHODS FOR FORMS
  selectemployeeCtrl.$onInit = function() {
    $http.get('https://netservices.internal.ca/lib/EmployeeService.svc/json/employee').then(function(response) {
      selectemployeeCtrl.options = response.data.ActiveEmployeesResult;
    });
  }

  selectemployeeCtrl.Callback = function(obj) {
    if(selectemployeeCtrl.callbackFn != undefined) selectemployeeCtrl.callbackFn({obj:obj});
  }
}
const selectemployeeComponent = {
  controller: SelectEmployeeCtrl,
  controllerAs: 'selectemployeeCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<?',
    disabled: '<?',
    required: '<'
  },
  template: selectemployee_css + selectemployee_html
};
angular.module('app').component('selectemployeeComponent', selectemployeeComponent);



/** COMPONENT NETSERVICES SELECTHARDWARE - 1.0.0 *******************************/
var selecthardware_html = '';
selecthardware_html += '<fieldset>';
selecthardware_html += '<legend data-ng-if=selecthardwareCtrl.label>{{selecthardwareCtrl.label}}</legend>';
selecthardware_html += '<ul>';
selecthardware_html += '<li>';
selecthardware_html += '<input type=hidden data-ng-model=selecthardwareCtrl.object data-ng-required=selecthardwareCtrl.required />';
selecthardware_html += '<select name=select-software data-ng-model=selecthardwareCtrl.hardware data-ng-options="each as each.label for each in selecthardwareCtrl.options" data-ng-change=selecthardwareCtrl.SetObject()>';
selecthardware_html += '<option value="">Select Hardware</option>';
selecthardware_html += '</select>';
selecthardware_html += '</li>';
selecthardware_html += '<li width=1% data-ng-if="selecthardwareCtrl.required && !selecthardwareCtrl.disabled">';
selecthardware_html += '<span data-ng-if=selecthardwareCtrl.multiple>';
selecthardware_html += '<i class="material-icons set" data-ng-if="selecthardwareCtrl.object">done</i>';
selecthardware_html += '<i class="material-icons unset" data-ng-if="!selecthardwareCtrl.object">error_outline</i>';
selecthardware_html += '</span>';
selecthardware_html += '<span data-ng-if=!selecthardwareCtrl.multiple>';
selecthardware_html += '<i class="material-icons set" data-ng-if="selecthardwareCtrl.object">done</i>';
selecthardware_html += '<i class="material-icons unset" data-ng-if="!selecthardwareCtrl.object">error_outline</i>';
selecthardware_html += '</span>';
selecthardware_html += '</li>';
selecthardware_html += '</ul>';
selecthardware_html += '<div data-ng-if=selecthardwareCtrl.object>';
selecthardware_html += '<ul class=item data-ng-repeat="each in selecthardwareCtrl.object">';
selecthardware_html += '<li><span><nobr>{{each.label}}</nobr></span></li>';
selecthardware_html += '<li><button type=button data-ng-click=selecthardwareCtrl.RemoveObject(each)>Remove</button></li>';
selecthardware_html += '</ul>';
selecthardware_html += '</div>';
selecthardware_html += '</fieldset>';

var selecthardware_css = '';
selecthardware_css += '<style>';
selecthardware_css += 'selecthardware-component { display: block; position: relative; }';
selecthardware_css += 'selecthardware-component > fieldset > ul { display: table; width: 100%; }';
selecthardware_css += 'selecthardware-component > fieldset > ul > li { display: table-cell; }';
selecthardware_css += 'selecthardware-component > fieldset > ul > li:first-child { width: 100%; }';
selecthardware_css += 'selecthardware-component > fieldset > ul > li:last-child { width: 1%; }';
selecthardware_css += 'selecthardware-component > fieldset > div { padding: .5rem 1rem; }';
selecthardware_css += 'selecthardware-component > fieldset > div > ul > li { display: table-cell; }';
selecthardware_css += 'selecthardware-component > fieldset > div > ul > li:last-child { width: 100%; padding-left: 1rem; text-align: right; }';
selecthardware_css += '</style>';

function selecthardwareCtrl($http)
{
  var selecthardwareCtrl = this;
  
  selecthardwareCtrl.$onInit = function() {
    var uri = 'https://netservices.internal.ca/lib/intakeservice.svc/json/clienthardware';
    $http.get(uri).then(function(response) {
      selecthardwareCtrl.options = response.data.map(item => {
        return {
          label: item.HardwareDescription,
          value: item
        };
      });
      selecthardwareCtrl.options.sort();
    });
  }

  selecthardwareCtrl.SetObject = function() {
    if(!selecthardwareCtrl.multiple) {
      selecthardwareCtrl.object = selecthardwareCtrl.hardware;
      selecthardwareCtrl.callback();
    } else {
      //remove item from options
      selecthardwareCtrl.options = selecthardwareCtrl.options.filter(item => item !== selecthardwareCtrl.hardware).sort();
      //add item to object
      selecthardwareCtrl.AddObject();
      selecthardwareCtrl.callback();
    }
  }

  selecthardwareCtrl.AddObject = function() {
    if(!selecthardwareCtrl.items) selecthardwareCtrl.items = [];
    selecthardwareCtrl.items.push(selecthardwareCtrl.hardware);
    selecthardwareCtrl.hardware = undefined;
    selecthardwareCtrl.object = selecthardwareCtrl.items;
  }

  selecthardwareCtrl.RemoveObject = function(obj) {
    //Adding item back to options
    selecthardwareCtrl.options.push(obj);
    //removing item from object
    selecthardwareCtrl.items = selecthardwareCtrl.items.filter(item => item !== obj);
    if(selecthardwareCtrl.items.length != 0) {
      selecthardwareCtrl.object = selecthardwareCtrl.items;
    } else {
      selecthardwareCtrl.items = undefined;
      selecthardwareCtrl.object = undefined;
    }
    selecthardwareCtrl.callback();
  }
  
  selecthardwareCtrl.callback = function() {
    if(selecthardwareCtrl.callbackFn != undefined) selecthardwareCtrl.callbackFn({obj:selecthardwareCtrl.object.value});
  }
}
const selecthardwareComponent = {
  controller: selecthardwareCtrl,
  controllerAs: 'selecthardwareCtrl',
  bindings: {
    callbackFn: '&?',
    object: '=',
    label: '<',
    required: '<?',
    disabled: '<?',
    multiple: '<?'
  },
  template: selecthardware_css + selecthardware_html
};
angular.module('app').component('selecthardwareComponent', selecthardwareComponent);



/** COMPONENT NETSERVICES SELECTIDENTITY - 1.0.0 *******************************/
var selectidentity_html = '';
selectidentity_html += '<fieldset>';
selectidentity_html += '<legend data-ng-if=selectidentityCtrl.label>{{selectidentityCtrl.label}}</legend>';
selectidentity_html += '<ul>';
selectidentity_html += '<li>';
selectidentity_html += '<select name=select-identity data-ng-model=selectidentityCtrl.object data-ng-required=selectidentityCtrl.required data-ng-options="each as each.label for each in selectidentityCtrl.options" data-ng-change=selectidentityCtrl.callback(selectidentityCtrl.object)>';
selectidentity_html += '<option value="">Please Select</option>';
selectidentity_html += '</select>';
selectidentity_html += '</li>';
selectidentity_html += '<li data-ng-if="selectidentityCtrl.required">';
selectidentity_html += '<i class="material-icons set" data-ng-if="selectidentityCtrl.object">done</i>';
selectidentity_html += '<i class="material-icons unset" data-ng-if="!selectidentityCtrl.object">error_outline</i>';
selectidentity_html += '</li>';
selectidentity_html += '</ul>';
selectidentity_html += '</fieldset>';

var selectidentity_css = '';
selectidentity_css += '<style type="text/css">';
selectidentity_css += 'selectidentity-component { display: block; position: relative; width: 100%; }';
selectidentity_css += 'selectidentity-component > fieldset > ul { display: table; width:100%; }';
selectidentity_css += 'selectidentity-component > fieldset > ul > li { display: table-cell; }';
selectidentity_css += 'selectidentity-component > fieldset > ul > li:first-child { width: 100%; }';
selectidentity_css += '</style>';

function selectidentityCtrl($http)
{
  var selectidentityCtrl = this;
  
  selectidentityCtrl.$onInit = function() {
    const uri = 'https://netservices.internal.ca/lib/intakeservice.svc/json/identity';
    $http.get(uri).then(function(resp) { 
      console.log(resp);
      selectidentityCtrl.options = resp.data.map(item => {
        return {
          label: item.FullName,
          value: item
        };
      }).sort();
    });
  }

  selectidentityCtrl.callback = function(obj) {
    if(selectidentityCtrl.callbackFn != undefined) selectidentityCtrl.callbackFn({obj:obj});
  }
}
const selectidentityComponent = {
  controller: selectidentityCtrl,
  controllerAs: 'selectidentityCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    disabled: '<?',
    required: '<',
    object: '='
  },
  template: selectidentity_css + selectidentity_html
};
angular.module('app').component('selectidentityComponent', selectidentityComponent);


/** COMPONENT NETSERVICES SELECTLOCATION - 1.0.0 *******************************/
var selectlocation_html = '';
selectlocation_html += '<fieldset>';
selectlocation_html += '<legend data-ng-if=selectlocationCtrl.label>{{selectlocationCtrl.label}}</legend>';
selectlocation_html += '<ul>';
selectlocation_html += '<li>';
selectlocation_html += '<select name=select-businessunit data-ng-options="each as each.label for each in selectlocationCtrl.options" data-ng-model=selectlocationCtrl.object data-ng-required=selectlocationCtrl.required data-ng-disabled=selectlocationCtrl.disabled data-ng-change=selectlocationCtrl.Callback(selectlocationCtrl.object)>';
selectlocation_html += '<option value="">Please Select</option>';
selectlocation_html += '</select>';
selectlocation_html += '</li>';
selectlocation_html += '<li data-ng-if="selectlocationCtrl.required && !selectlocationCtrl.disabled">';
selectlocation_html += '<i class="material-icons set" data-ng-if="selectlocationCtrl.object">done</i>';
selectlocation_html += '<i class="material-icons unset" data-ng-if="!selectlocationCtrl.object">error_outline</i>';
selectlocation_html += '</li>';
selectlocation_html += '</ul>';
selectlocation_html += '</fieldset>';

var selectlocation_css = '';
selectlocation_css += '<style>';
selectlocation_css += 'selectlocation-component { display: block; position: relative; width: 100%; }';
selectlocation_css += 'selectlocation-component > fieldset > ul { display: table; width: 100%; }';
selectlocation_css += 'selectlocation-component > fieldset > ul > li { display: table-cell; }';
selectlocation_css += 'selectlocation-component > fieldset > ul > li:first-child { width: 100%; }';
selectlocation_css += '</style>';

function selectlocationComponentCtrl ($http)
{
  var selectlocationCtrl = this;

  selectlocationCtrl.$onInit = function() {
    $http.get('https://netservices.internal.ca/lib/TechnologyService.svc/json/kace/location').then(function(response) {
      selectlocationCtrl.options = response.data.AllKaceLocationsResult.map(item => {
        return { 
          label: item.NAME,
          value: item.NAME
        }
      }).sort();

      if(selectlocationCtrl.value) {
        selectlocationCtrl.object = selectlocationCtrl.options.filter(item => item.label == selectlocationCtrl.value)[0];
      }
    });
  }

  selectlocationCtrl.Callback = function(obj) {
    if(selectlocationCtrl.callbackFn != undefined) selectlocationCtrl.callbackFn({obj:obj});
  }
}
const selectlocationComponent = {
  controller: selectlocationComponentCtrl,
  controllerAs: 'selectlocationCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<?',
    disabled: '<?',
    value: "<?",
    required: '<'
  },
  template: selectlocation_css + selectlocation_html
};
angular.module('app').component('selectlocationComponent', selectlocationComponent);



/** COMPONENT NETSERVICES- SELECTNETWORKDRIVE - 1.0.0 **************************/
var selectnetworkdrive_html = '';
selectnetworkdrive_html += '<fieldset>';
selectnetworkdrive_html += '<legend data-ng-if=selectnetworkdriveCtrl.label>{{selectnetworkdriveCtrl.label}}</legend>';
selectnetworkdrive_html += '<ul>';
selectnetworkdrive_html += '<li>';
selectnetworkdrive_html += '<select name=select-identity data-ng-model=selectnetworkdriveCtrl.object data-ng-required=selectnetworkdriveCtrl.required data-ng-options="each as each.label for each in selectnetworkdriveCtrl.options" data-ng-change=selectnetworkdriveCtrl.callback(selectnetworkdriveCtrl.object)>';
selectnetworkdrive_html += '<option value="">Please Select</option>';
selectnetworkdrive_html += '</select>';
selectnetworkdrive_html += '</li>';
selectnetworkdrive_html += '<li data-ng-if="selectnetworkdriveCtrl.required">';
selectnetworkdrive_html += '<i class="material-icons set" data-ng-if="selectnetworkdriveCtrl.object">done</i>';
selectnetworkdrive_html += '<i class="material-icons unset" data-ng-if="!selectnetworkdriveCtrl.object">error_outline</i>';
selectnetworkdrive_html += '</li>';
selectnetworkdrive_html += '</ul>';
selectnetworkdrive_html += '</fieldset>';

var selectnetworkdrive_css = '';
selectnetworkdrive_css += '<style type="text/css">';
selectnetworkdrive_css += 'selectnetworkdrive-component { display: block; position: relative; width: 100%; }';
selectnetworkdrive_css += 'selectnetworkdrive-component > fieldset > ul { display: table; width:100%; }';
selectnetworkdrive_css += 'selectnetworkdrive-component > fieldset > ul > li { display: table-cell; }';
selectnetworkdrive_css += 'selectnetworkdrive-component > fieldset > ul > li:first-child { width: 100%; }';
selectnetworkdrive_css += '</style>';

function selectnetworkdriveCtrl($http)
{
  var selectnetworkdriveCtrl = this;
  
  selectnetworkdriveCtrl.$onInit = function() {
    const uri = 'https://netservices.internal.ca/lib/intakeservice.svc/json/networkdrive';
    $http.get(uri).then(function(resp) { 
      console.log(resp);
      selectnetworkdriveCtrl.options = resp.data.map(item => {
        return {
          label: item.NetworkDriveDescription,
          value: item
        };
      }).sort();
    });
  }

  selectnetworkdriveCtrl.callback = function(obj) {
    if(selectnetworkdriveCtrl.callbackFn != undefined) selectnetworkdriveCtrl.callbackFn({obj:obj});
  }
}
const selectnetworkdriveComponent = {
  controller: selectnetworkdriveCtrl,
  controllerAs: 'selectnetworkdriveCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    disabled: '<?',
    required: '<',
    object: '='
  },
  template: selectnetworkdrive_css + selectnetworkdrive_html
};
angular.module('app').component('selectnetworkdriveComponent', selectnetworkdriveComponent);




/** COMPONENT NETSERVICES SELECTSOFTWARE - 1.0.0 *******************************/
var selectsoftware_html = '';
selectsoftware_html += '<fieldset>';
selectsoftware_html += '<legend data-ng-if=selectsoftwareCtrl.label>{{selectsoftwareCtrl.label}}</legend>';
selectsoftware_html += '<ul>';
selectsoftware_html += '<li>';
selectsoftware_html += '<input type=hidden data-ng-model=selectsoftwareCtrl.object data-ng-required=selectsoftwareCtrl.required />';
selectsoftware_html += '<select name=select-software data-ng-model=selectsoftwareCtrl.software data-ng-options="each as each.label for each in selectsoftwareCtrl.options.software" data-ng-change=selectsoftwareCtrl.SetSoftware()>';
selectsoftware_html += '<option value="">Please Select</option>';
selectsoftware_html += '</select>';
selectsoftware_html += '<select data-ng-if="selectsoftwareCtrl.software && selectsoftwareCtrl.options.roles" name=select-software-role data-ng-model=selectsoftwareCtrl.role data-ng-required=selectsoftwareCtrl.required data-ng-options="each as each.label for each in selectsoftwareCtrl.options.roles" data-ng-change=selectsoftwareCtrl.AddObject()>';
selectsoftware_html += '<option value="">Select Role</option>';
selectsoftware_html += '</select>';
selectsoftware_html += '</li>';
selectsoftware_html += '<li width=1% data-ng-if="selectsoftwareCtrl.required && !selectsoftwareCtrl.disabled">';
selectsoftware_html += '<i class="material-icons set" data-ng-if="selectsoftwareCtrl.object">done</i>';
selectsoftware_html += '<i class="material-icons unset" data-ng-if="!selectsoftwareCtrl.object">error_outline</i>';
selectsoftware_html += '</li>';
selectsoftware_html += '</ul>';
selectsoftware_html += '<div data-ng-if=selectsoftwareCtrl.object>';
selectsoftware_html += '<ul class=item data-ng-repeat="each in selectsoftwareCtrl.object">';
selectsoftware_html += '<li><span><nobr>{{each.label}}</nobr></span></li>';
selectsoftware_html += '<li><span data-ng-if=each.role><nobr>{{each.role}}</nobr></span></li>';
selectsoftware_html += '<li><button type=button data-ng-click=selectsoftwareCtrl.RemoveObject(each)>Remove</button></li>';
selectsoftware_html += '</ul>';
selectsoftware_html += '</div>';
selectsoftware_html += '</fieldset>';

var selectsoftware_css = '';
selectsoftware_css += '<style>';
selectsoftware_css += 'selectsoftware-component { display: block; position: relative; }';
selectsoftware_css += 'selectsoftware-component > fieldset > ul { display: table; width: 100%; }';
selectsoftware_css += 'selectsoftware-component > fieldset > ul > li { display: table-cell; }';
selectsoftware_css += 'selectsoftware-component > fieldset > ul > li:first-child { width: 100%; }';
selectsoftware_css += 'selectsoftware-component > fieldset > ul > li:last-child { width: 1%; }';
selectsoftware_css += 'selectsoftware-component > fieldset > div { padding: .5rem 1rem; }';
selectsoftware_css += 'selectsoftware-component > fieldset > div > ul > li { display: table-cell; width: 50%; }';
selectsoftware_css += 'selectsoftware-component > fieldset > div > ul > li:last-child { width: 100%; padding-left: 1rem; text-align: right; }';
selectsoftware_css += '</style>';

function selectsoftwareCtrl($http)
{
  var selectsoftwareCtrl = this;

  selectsoftwareCtrl.$onInit = function() {
    var uri = 'https://netservices.internal.ca/lib/intakeservice.svc/json/clientsoftware';
    $http.get(uri).then(function(response) {
      var resp = response.data;
      selectsoftwareCtrl.options = {
        software: [],
        roles: null
      };
      selectsoftwareCtrl.options.software = resp.map(item => {
        return {
          label: item.ResourceName,
          value: item
        };
      }).sort();
    });
  }

  selectsoftwareCtrl.SetSoftware = function() {
    if(!selectsoftwareCtrl.multiple) {
      selectsoftwareCtrl.object = selectsoftwareCtrl.software;
      selectsoftwareCtrl.callback();
    } else {
      if(!selectsoftwareCtrl.software.value.Roles.length) {
        selectsoftwareCtrl.AddObject();
        selectsoftwareCtrl.callback();
      } else {
        selectsoftwareCtrl.options.roles = selectsoftwareCtrl.software.value.Roles.map(item => {
          return {
            label: item.Description,
            value: item
          };
        }).sort();
      }
    }
  }

  selectsoftwareCtrl.AddObject = function() {
    if(!selectsoftwareCtrl.items) selectsoftwareCtrl.items = [];
    selectsoftwareCtrl.items.push({
      label: selectsoftwareCtrl.software.label,
      role: (selectsoftwareCtrl.role ? selectsoftwareCtrl.role.label : undefined)
    });
    selectsoftwareCtrl.software = undefined;
    selectsoftwareCtrl.role = undefined;
    selectsoftwareCtrl.options.roles = undefined;
    selectsoftwareCtrl.object = selectsoftwareCtrl.items;
  }
  
  selectsoftwareCtrl.RemoveObject = function(obj) {
    selectsoftwareCtrl.items = selectsoftwareCtrl.items.filter(item => item !== obj);
    if(selectsoftwareCtrl.items.length != 0) {
      selectsoftwareCtrl.object = selectsoftwareCtrl.items;
    } else {
      selectsoftwareCtrl.items = undefined;
      selectsoftwareCtrl.object = undefined;
    }
    selectsoftwareCtrl.callback();
  }
  
  selectsoftwareCtrl.callback = function() {
    if(selectsoftwareCtrl.callbackFn != undefined) selectsoftwareCtrl.callbackFn({obj:selectsoftwareCtrl.object.value});
  }
}
const selectsoftwareComponent = {
  controller: selectsoftwareCtrl,
  controllerAs: 'selectsoftwareCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    disabled: '<?',
    required: '<',
    object: '=',
    param: '<?',
    multiple: '<?',
    roles: '<?'
  },
  template: selectsoftware_css + selectsoftware_html
};
angular.module('app').component('selectsoftwareComponent', selectsoftwareComponent);



/** COMPONENT NETSERVICES SIGNIN - 1.0.1 ***************************************/
var signin_html = '';
signin_html += '<div>';
signin_html += '<img data-ng-src="{{signinCtrl.image}}" alt="Brand Image" />';
signin_html += '</div>';
signin_html += '<ul>';
signin_html += '<li>';
signin_html += '<select name=select-user data-ng-model=signinCtrl.object data-ng-options="each as each.label for each in signinCtrl.options" data-ng-required=signinCtrl.required data-ng-change=signinCtrl.callback()>';
signin_html += '<option value="">Please Sign In</option>';
signin_html += '</select>';
signin_html += '</li>';
signin_html += '<li data-ng-if="signinCtrl.required">';
signin_html += '<i class="material-icons set" data-ng-if="signinCtrl.object">done</i>';
signin_html += '<i class="material-icons unset" data-ng-if="!signinCtrl.object">error_outline</i>';
signin_html += '</li>';
signin_html += '</ul>';

var signin_css = '';
signin_css += '<style type="text/css">';
signin_css += 'signin-component { display: block; position: relative; width: 15rem; margin: 0 auto; padding: 3rem 0; }';
signin_css += 'signin-component > div { bottom: 0; width: 100%; text-align: center; }';
signin_css += 'signin-component > ul { display: table; margin: 0; padding: 0; width: 100%; }';
signin_css += 'signin-component > ul > li { display: table-cell; }';
signin_css += 'signin-component > ul > li:first-child { width: 100%; }';
signin_css += '</style>';

function signinCtrl($http)
{
  var signinCtrl = this;
  
  signinCtrl.$onInit = function() {
    $http.get('https://netservices.internal.ca/lib/EmployeeService.svc/json/employee').then(function(response) {
      console.log(response.data);
      signinCtrl.options = response.data.ActiveEmployeesResult.map(item => {
        return {
          label: item.FullName,
          value: item
        };
      }).sort();
    });
  }

  signinCtrl.callback = function() {
    if(signinCtrl.callbackFn != undefined) signinCtrl.callbackFn({obj:signinCtrl.object.value});
  }
}
const signinComponent = {
  controller: signinCtrl,
  controllerAs: 'signinCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    image: '<?'
  },
  template: signin_css + signin_html
};
angular.module('app').component('signinComponent', signinComponent);