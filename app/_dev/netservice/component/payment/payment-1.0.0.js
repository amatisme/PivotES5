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
